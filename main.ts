import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace, TerraformOutput, DataTerraformRemoteState, TerraformAsset, AssetType } from "cdktf";
import { AwsProvider,s3 , lambdafunction, iam, apigateway} from "@cdktf/provider-aws";
import path = require("path");

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new AwsProvider(this, "AWS", {
      region: "eu-central-1",
    });

    const asset = new TerraformAsset(this, "lambda-asset", {
      path: path.resolve(__dirname, "./src"),
      type: AssetType.ARCHIVE, 
    });

    // you can add random provider to ensure unique name for the bucket
    const assetBucket = new s3.S3Bucket(this, "bucket2", {
      bucket: 'lambda-asset-bucket-test12312342211',
    });

    const lambdaArchive = new s3.S3BucketObject(this, "lambda-zip", {
      bucket: assetBucket.bucket,
      key: asset.fileName,
      source: asset.path,
      sourceHash: asset.assetHash
    });

    const lambdaRole = {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    };

    const role = new iam.IamRole(this, "lambda-execution-role", {
      name: 'lambda-execution-role-test1231234',
      assumeRolePolicy: JSON.stringify(lambdaRole)
    });

    new iam.IamRolePolicyAttachment(this, "lambda-managed-policy-attachment", {
      policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
      role: role.name
    });

    // getting the state from terraform cloud
    const remoteState = new DataTerraformRemoteState(this, "remote-state", {
      organization: "pedram-company",
      hostname: "app.terraform.io",
      workspaces: {
        name: "mongodbtest",
      }
    });

    
   const lambdafunc = new lambdafunction.LambdaFunction(this, "lambdaFunc", {
      functionName: 'HelloLambda',
      s3Bucket: assetBucket.bucket,
      s3Key: lambdaArchive.key,
      sourceCodeHash: lambdaArchive.sourceHash,
      handler: 'index.handler',
      runtime: 'nodejs14.x',
      role: role.arn,
      environment: {
        variables: {
          "CONNECTIONSTRING": remoteState.get('connection_strings').toString()
        }
      }
    });

    const api=new apigateway.ApiGatewayRestApi(this, "api", {
      name: "sentiment-api",
      description: "api",
    });

    const resource = new apigateway.ApiGatewayResource(this, "resource", {
      restApiId: api.id,
      parentId: api.rootResourceId,
      pathPart: "resource"
    });


    const getApi = new apigateway.ApiGatewayMethod(this, "getApi", {
      restApiId: api.id,
      resourceId: resource.id,
      httpMethod: "GET",
      authorization: "NONE"
    });

    const putApi = new apigateway.ApiGatewayMethod(this, "putApi", {
      restApiId: api.id,
      resourceId: resource.id,
      httpMethod: "PUT",
      authorization: "NONE"
    });
    
    new apigateway.ApiGatewayIntegration(this, "apiIntegration3", {
      restApiId: api.id,
      resourceId: resource.id,
      httpMethod: putApi.httpMethod,
      integrationHttpMethod: "POST",
      type: "AWS_PROXY",
      uri: lambdafunc.invokeArn
    });
    

    new apigateway.ApiGatewayIntegration(this, "apiIntegration2", {
      restApiId: api.id,
      resourceId: resource.id,
      httpMethod: getApi.httpMethod,      
      integrationHttpMethod: "POST",
      type: "AWS_PROXY",
      uri: lambdafunc.invokeArn
    });

    new lambdafunction.LambdaPermission(this, "apig-lambda", {
      statementId: "AllowExecutionFromAPIGateway",
      action: "lambda:InvokeFunction",
      functionName: lambdafunc.functionName,
      principal: "apigateway.amazonaws.com",
      sourceArn: `${api.executionArn}/*/*`      
    });

    const apiDepl = new apigateway.ApiGatewayDeployment(this, "deployment", {
      restApiId: api.id,
      dependsOn: [getApi,putApi]
    });
    
    const apiStage = new apigateway.ApiGatewayStage(this, "stage", {
      restApiId : api.id,
      stageName: "test",
      deploymentId: apiDepl.id,
    });


    new TerraformOutput(this, "apiUrl", {
      value: apiStage.invokeUrl,
      description: "API URL"
    });

  }
}

const app = new App();
const stack = new MyStack(app, "cdktf-test-remote2");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "pedram-company",
  workspaces: new NamedCloudWorkspace("cdktf-test-remote2")
});
app.synth();
