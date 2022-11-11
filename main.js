"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdktf_1 = require("cdktf");
const provider_aws_1 = require("@cdktf/provider-aws");
const path = require("path");
class MyStack extends cdktf_1.TerraformStack {
    constructor(scope, name) {
        super(scope, name);
        new provider_aws_1.AwsProvider(this, "AWS", {
            region: "us-west-1",
        });
        const asset = new cdktf_1.TerraformAsset(this, "lambda-asset", {
            path: path.resolve(__dirname, "./src"),
            type: cdktf_1.AssetType.ARCHIVE,
        });
        // you can add random provider to ensure unique name for the bucket
        const assetBucket = new provider_aws_1.s3.S3Bucket(this, "bucket2", {
            bucket: 'lambda-asset-bucket-test12312342211',
        });
        const lambdaArchive = new provider_aws_1.s3.S3BucketObject(this, "lambda-zip", {
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
        const role = new provider_aws_1.iam.IamRole(this, "lambda-execution-role", {
            name: 'lambda-execution-role-test1231234',
            assumeRolePolicy: JSON.stringify(lambdaRole)
        });
        new provider_aws_1.iam.IamRolePolicyAttachment(this, "lambda-managed-policy-attachment", {
            policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
            role: role.name
        });
        // getting the state from terraform cloud
        const remoteState = new cdktf_1.DataTerraformRemoteState(this, "remote-state", {
            organization: "pedram-company",
            hostname: "app.terraform.io",
            workspaces: {
                name: "mongodbtest",
            }
        });
        const lambdafunc = new provider_aws_1.lambdafunction.LambdaFunction(this, "lambdaFunc", {
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
        const api = new provider_aws_1.apigateway.ApiGatewayRestApi(this, "api", {
            name: "sentiment-api",
            description: "api",
        });
        const resource = new provider_aws_1.apigateway.ApiGatewayResource(this, "resource", {
            restApiId: api.id,
            parentId: api.rootResourceId,
            pathPart: "resource"
        });
        const getApi = new provider_aws_1.apigateway.ApiGatewayMethod(this, "getApi", {
            restApiId: api.id,
            resourceId: resource.id,
            httpMethod: "GET",
            authorization: "NONE"
        });
        const putApi = new provider_aws_1.apigateway.ApiGatewayMethod(this, "putApi", {
            restApiId: api.id,
            resourceId: resource.id,
            httpMethod: "PUT",
            authorization: "NONE"
        });
        new provider_aws_1.apigateway.ApiGatewayIntegration(this, "apiIntegration3", {
            restApiId: api.id,
            resourceId: resource.id,
            httpMethod: putApi.httpMethod,
            integrationHttpMethod: "POST",
            type: "AWS_PROXY",
            uri: lambdafunc.invokeArn
        });
        new provider_aws_1.apigateway.ApiGatewayIntegration(this, "apiIntegration2", {
            restApiId: api.id,
            resourceId: resource.id,
            httpMethod: getApi.httpMethod,
            integrationHttpMethod: "POST",
            type: "AWS_PROXY",
            uri: lambdafunc.invokeArn
        });
        new provider_aws_1.lambdafunction.LambdaPermission(this, "apig-lambda", {
            statementId: "AllowExecutionFromAPIGateway",
            action: "lambda:InvokeFunction",
            functionName: lambdafunc.functionName,
            principal: "apigateway.amazonaws.com",
            sourceArn: `${api.executionArn}/*/*`
        });
        const apiDepl = new provider_aws_1.apigateway.ApiGatewayDeployment(this, "deployment", {
            restApiId: api.id,
            dependsOn: [getApi, putApi]
        });
        const apiStage = new provider_aws_1.apigateway.ApiGatewayStage(this, "stage", {
            restApiId: api.id,
            stageName: "test",
            deploymentId: apiDepl.id,
        });
        new cdktf_1.TerraformOutput(this, "apiUrl", {
            value: apiStage.invokeUrl,
            description: "API URL"
        });
    }
}
const app = new cdktf_1.App();
const stack = new MyStack(app, "cdktf-test-remote2");
new cdktf_1.CloudBackend(stack, {
    hostname: "app.terraform.io",
    organization: "pedram-company",
    workspaces: new cdktf_1.NamedCloudWorkspace("cdktf-test-remote2")
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpQ0FBcUo7QUFDckosc0RBQXNGO0FBQ3RGLDZCQUE4QjtBQUU5QixNQUFNLE9BQVEsU0FBUSxzQkFBYztJQUNsQyxZQUFZLEtBQWdCLEVBQUUsSUFBWTtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksMEJBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzNCLE1BQU0sRUFBRSxXQUFXO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLElBQUksc0JBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3JELElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7WUFDdEMsSUFBSSxFQUFFLGlCQUFTLENBQUMsT0FBTztTQUN4QixDQUFDLENBQUM7UUFFSCxtRUFBbUU7UUFDbkUsTUFBTSxXQUFXLEdBQUcsSUFBSSxpQkFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25ELE1BQU0sRUFBRSxxQ0FBcUM7U0FDOUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQzlELE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtZQUMxQixHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDbkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxLQUFLLENBQUMsU0FBUztTQUM1QixDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRztZQUNqQixTQUFTLEVBQUUsWUFBWTtZQUN2QixXQUFXLEVBQUU7Z0JBQ1g7b0JBQ0UsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsV0FBVyxFQUFFO3dCQUNYLFNB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QUM7SUFFTCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3JELElBQUksb0JBQVksQ0FBQyxLQUFLLEVBQUU7SUFDdEIsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixZQUFZLEVBQUUsZ0JBQWdCO0lBQzlCLFVBQVUsRUFBRSxJQUFJLDJCQUFtQixDQUFDLG9CQUFvQixDQUFDO0NBQzFELENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBBcHAsIFRlcnJhZm9ybVN0YWNrLCBDbG91ZEJhY2tlbmQsIE5hbWVkQ2xvdWRXb3Jrc3BhY2UsIFRlcnJhZm9ybU91dHB1dCwgRGF0YVRlcnJhZm9ybVJlbW90ZVN0YXRlLCBUZXJyYWZvcm1Bc3NldCwgQXNzZXRUeXBlIH0gZnJvbSBcImNka3RmXCI7XG5pbXBvcnQgeyBBd3NQcm92aWRlcixzMyAsIGxhbWJkYWZ1bmN0aW9uLCBpYW0sIGFwaWdhdGV3YXl9IGZyb20gXCJAY2RrdGYvcHJvdmlkZXItYXdzXCI7XG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5jbGFzcyBNeVN0YWNrIGV4dGVuZHMgVGVycmFmb3JtU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgbmFtZSk7XG4gICAgbmV3IEF3c1Byb3ZpZGVyKHRoaXMsIFwiQVdTXCIsIHtcbiAgICAgIHJlZ2lvbjogXCJ1cy13ZXN0LTFcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IGFzc2V0ID0gbmV3IFRlcnJhZm9ybUFzc2V0KHRoaXMsIFwibGFtYmRhLWFzc2V0XCIsIHtcbiAgICAgIHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICB0eXBlOiBBc3NldFR5cGUuQVJDSElWRSwgXG4gICAgfSk7XG5cbiAgICAvLyB5b3UgY2FuIGFkZCByYW5kb20gcHJvdmlkZXIgdG8gZW5zdXJlIHVuaXF1ZSBuYW1lIGZvciB0aGUgYnVja2V0XG4gICAgY29uc3QgYXNzZXRCdWNrZXQgPSBuZXcgczMuUzNCdWNrZXQodGhpcywgXCJidWNrZXQyXCIsIHtcbiAgICAgIGJ1Y2tldDogJ2xhbWJkYS1hc3NldC1idWNrZXQtdGVzdDEyMzEyMzQyMjExJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGxhbWJkYUFyY2hpdmUgPSBuZXcgczMuUzNCdWNrZXRPYmplY3QodGhpcywgXCJsYW1iZGEtemlwXCIsIHtcbiAgICAgIGJ1Y2tldDogYXNzZXRCdWNrZXQuYnVja2V0LFxuICAgICAga2V5OiBhc3NldC5maWxlTmFtZSxcbiAgICAgIHNvdXJjZTogYXNzZXQucGF0aCxcbiAgICAgIHNvdXJjZUhhc2g6IGFzc2V0LmFzc2V0SGFzaFxuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhUm9sZSA9IHtcbiAgICAgIFwiVmVyc2lvblwiOiBcIjIwMTItMTAtMTdcIixcbiAgICAgIFwiU3RhdGVtZW50XCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwiQWN0aW9uXCI6IFwic3RzOkFzc3VtZVJvbGVcIixcbiAgICAgICAgICBcIlByaW5jaXBhbFwiOiB7XG4gICAgICAgICAgICBcIlNlcnZpY2VcIjogXCJsYW1iZGEuYW1hem9uYXdzLmNvbVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIkVmZmVjdFwiOiBcIkFsbG93XCIsXG4gICAgICAgICAgXCJTaWRcIjogXCJcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICAgIGNvbnN0IHJvbGUgPSBuZXcgaWFtLklhbVJvbGUodGhpcywgXCJsYW1iZGEtZXhlY3V0aW9uLXJvbGVcIiwge1xuICAgICAgbmFtZTogJ2xhbWJkYS1leGVjdXRpb24tcm9sZS10ZXN0MTIzMTIzNCcsXG4gICAgICBhc3N1bWVSb2xlUG9saWN5OiBKU09OLnN0cmluZ2lmeShsYW1iZGFSb2xlKVxuICAgIH0pO1xuXG4gICAgbmV3IGlhbS5JYW1Sb2xlUG9saWN5QXR0YWNobWVudCh0aGlzLCBcImxhbWJkYS1tYW5hZ2VkLXBvbGljeS1hdHRhY2htZW50XCIsIHtcbiAgICAgIHBvbGljeUFybjogJ2Fybjphd3M6aWFtOjphd3M6cG9saWN5L3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGUnLFxuICAgICAgcm9sZTogcm9sZS5uYW1lXG4gICAgfSk7XG5cbiAgICAvLyBnZXR0aW5nIHRoZSBzdGF0ZSBmcm9tIHRlcnJhZm9ybSBjbG91ZFxuICAgIGNvbnN0IHJlbW90ZVN0YXRlID0gbmV3IERhdGFUZXJyYWZvcm1SZW1vdGVTdGF0ZSh0aGlzLCBcInJlbW90ZS1zdGF0ZVwiLCB7XG4gICAgICBvcmdhbml6YXRpb246IFwicGVkcmFtLWNvbXBhbnlcIixcbiAgICAgIGhvc3RuYW1lOiBcImFwcC50ZXJyYWZvcm0uaW9cIixcbiAgICAgIHdvcmtzcGFjZXM6IHtcbiAgICAgICAgbmFtZTogXCJtb25nb2RidGVzdFwiLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgXG4gICBjb25zdCBsYW1iZGFmdW5jID0gbmV3IGxhbWJkYWZ1bmN0aW9uLkxhbWJkYUZ1bmN0aW9uKHRoaXMsIFwibGFtYmRhRnVuY1wiLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6ICdIZWxsb0xhbWJkYScsXG4gICAgICBzM0J1Y2tldDogYXNzZXRCdWNrZXQuYnVja2V0LFxuICAgICAgczNLZXk6IGxhbWJkYUFyY2hpdmUua2V5LFxuICAgICAgc291cmNlQ29kZUhhc2g6IGxhbWJkYUFyY2hpdmUuc291cmNlSGFzaCxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6ICdub2RlanMxNC54JyxcbiAgICAgIHJvbGU6IHJvbGUuYXJuLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgdmFyaWFibGVzOiB7XG4gICAgICAgICAgXCJDT05ORUNUSU9OU1RSSU5HXCI6IHJlbW90ZVN0YXRlLmdldCgnY29ubmVjdGlvbl9zdHJpbmdzJykudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGk9bmV3IGFwaWdhdGV3YXkuQXBpR2F0ZXdheVJlc3RBcGkodGhpcywgXCJhcGlcIiwge1xuICAgICAgbmFtZTogXCJzZW50aW1lbnQtYXBpXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJhcGlcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc291cmNlID0gbmV3IGFwaWdhdGV3YXkuQXBpR2F0ZXdheVJlc291cmNlKHRoaXMsIFwicmVzb3VyY2VcIiwge1xuICAgICAgcmVzdEFwaUlkOiBhcGkuaWQsXG4gICAgICBwYXJlbnRJZDogYXBpLnJvb3RSZXNvdXJjZUlkLFxuICAgICAgcGF0aFBhcnQ6IFwicmVzb3VyY2VcIlxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBnZXRBcGkgPSBuZXcgYXBpZ2F0ZXdheS5BcGlHYXRld2F5TWV0aG9kKHRoaXMsIFwiZ2V0QXBpXCIsIHtcbiAgICAgIHJlc3RBcGlJZDogYXBpLmlkLFxuICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXG4gICAgICBodHRwTWV0aG9kOiBcIkdFVFwiLFxuICAgICAgYXV0aG9yaXphdGlvbjogXCJOT05FXCJcbiAgICB9KTtcblxuICAgIGNvbnN0IHB1dEFwaSA9IG5ldyBhcGlnYXRld2F5LkFwaUdhdGV3YXlNZXRob2QodGhpcywgXCJwdXRBcGlcIiwge1xuICAgICAgcmVzdEFwaUlkOiBhcGkuaWQsXG4gICAgICByZXNvdXJjZUlkOiByZXNvdXJjZS5pZCxcbiAgICAgIGh0dHBNZXRob2Q6IFwiUFVUXCIsXG4gICAgICBhdXRob3JpemF0aW9uOiBcIk5PTkVcIlxuICAgIH0pO1xuICAgIFxuICAgIG5ldyBhcGlnYXRld2F5LkFwaUdhdGV3YXlJbnRlZ3JhdGlvbih0aGlzLCBcImFwaUludGVncmF0aW9uM1wiLCB7XG4gICAgICByZXN0QXBpSWQ6IGFwaS5pZCxcbiAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgaHR0cE1ldGhvZDogcHV0QXBpLmh0dHBNZXRob2QsXG4gICAgICBpbnRlZ3JhdGlvbkh0dHBNZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdHlwZTogXCJBV1NfUFJPWFlcIixcbiAgICAgIHVyaTogbGFtYmRhZnVuYy5pbnZva2VBcm5cbiAgICB9KTtcbiAgICBcblxuICAgIG5ldyBhcGlnYXRld2F5LkFwaUdhdGV3YXlJbnRlZ3JhdGlvbih0aGlzLCBcImFwaUludGVncmF0aW9uMlwiLCB7XG4gICAgICByZXN0QXBpSWQ6IGFwaS5pZCxcbiAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgaHR0cE1ldGhvZDogZ2V0QXBpLmh0dHBNZXRob2QsICAgICAgXG4gICAgICBpbnRlZ3JhdGlvbkh0dHBNZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdHlwZTogXCJBV1NfUFJPWFlcIixcbiAgICAgIHVyaTogbGFtYmRhZnVuYy5pbnZva2VBcm5cbiAgICB9KTtcblxuICAgIG5ldyBsYW1iZGFmdW5jdGlvbi5MYW1iZGFQZXJtaXNzaW9uKHRoaXMsIFwiYXBpZy1sYW1iZGFcIiwge1xuICAgICAgc3RhdGVtZW50SWQ6IFwiQWxsb3dFeGVjdXRpb25Gcm9tQVBJR2F0ZXdheVwiLFxuICAgICAgYWN0aW9uOiBcImxhbWJkYTpJbnZva2VGdW5jdGlvblwiLFxuICAgICAgZnVuY3Rpb25OYW1lOiBsYW1iZGFmdW5jLmZ1bmN0aW9uTmFtZSxcbiAgICAgIHByaW5jaXBhbDogXCJhcGlnYXRld2F5LmFtYXpvbmF3cy5jb21cIixcbiAgICAgIHNvdXJjZUFybjogYCR7YXBpLmV4ZWN1dGlvbkFybn0vKi8qYCAgICAgIFxuICAgIH0pO1xuXG4gICAgY29uc3QgYXBpRGVwbCA9IG5ldyBhcGlnYXRld2F5LkFwaUdhdGV3YXlEZXBsb3ltZW50KHRoaXMsIFwiZGVwbG95bWVudFwiLCB7XG4gICAgICByZXN0QXBpSWQ6IGFwaS5pZCxcbiAgICAgIGRlcGVuZHNPbjogW2dldEFwaSxwdXRBcGldXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgYXBpU3RhZ2UgPSBuZXcgYXBpZ2F0ZXdheS5BcGlHYXRld2F5U3RhZ2UodGhpcywgXCJzdGFnZVwiLCB7XG4gICAgICByZXN0QXBpSWQgOiBhcGkuaWQsXG4gICAgICBzdGFnZU5hbWU6IFwidGVzdFwiLFxuICAgICAgZGVwbG95bWVudElkOiBhcGlEZXBsLmlkLFxuICAgIH0pO1xuXG5cbiAgICBuZXcgVGVycmFmb3JtT3V0cHV0KHRoaXMsIFwiYXBpVXJsXCIsIHtcbiAgICAgIHZhbHVlOiBhcGlTdGFnZS5pbnZva2VVcmwsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBUEkgVVJMXCJcbiAgICB9KTtcblxuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IE15U3RhY2soYXBwLCBcImNka3RmLXRlc3QtcmVtb3RlMlwiKTtcbm5ldyBDbG91ZEJhY2tlbmQoc3RhY2ssIHtcbiAgaG9zdG5hbWU6IFwiYXBwLnRlcnJhZm9ybS5pb1wiLFxuICBvcmdhbml6YXRpb246IFwicGVkcmFtLWNvbXBhbnlcIixcbiAgd29ya3NwYWNlczogbmV3IE5hbWVkQ2xvdWRXb3Jrc3BhY2UoXCJjZGt0Zi10ZXN0LXJlbW90ZTJcIilcbn0pO1xuYXBwLnN5bnRoKCk7XG4iXX0=