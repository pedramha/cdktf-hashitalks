"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cdktf/lib/testing/adapters/jest"); // Load types for expect matchers
// import { Testing } from "cdktf";
describe("My CDKTF Application", () => {
    // The tests below are example tests, you can find more information at
    // https://cdk.tf/testing
    it.todo("should be tested");
    // // All Unit tests test the synthesised terraform code, it does not create real-world resources
    // describe("Unit testing using assertions", () => {
    //   it("should contain a resource", () => {
    //     // import { Image,Container } from "./.gen/providers/docker"
    //     expect(
    //       Testing.synthScope((scope) => {
    //         new MyApplicationsAbstraction(scope, "my-app", {});
    //       })
    //     ).toHaveResource(Container);
    //     expect(
    //       Testing.synthScope((scope) => {
    //         new MyApplicationsAbstraction(scope, "my-app", {});
    //       })
    //     ).toHaveResourceWithProperties(Image, { name: "ubuntu:latest" });
    //   });
    // });
    // describe("Unit testing using snapshots", () => {
    //   it("Tests the snapshot", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestProvider(stack, "provider", {
    //       accessKey: "1",
    //     });
    //     new TestResource(stack, "test", {
    //       name: "my-resource",
    //     });
    //     expect(Testing.synth(stack)).toMatchSnapshot();
    //   });
    //   it("Tests a combination of resources", () => {
    //     expect(
    //       Testing.synthScope((stack) => {
    //         new TestDataSource(stack, "test-data-source", {
    //           name: "foo",
    //         });
    //         new TestResource(stack, "test-resource", {
    //           name: "bar",
    //         });
    //       })
    //     ).toMatchInlineSnapshot();
    //   });
    // });
    // describe("Checking validity", () => {
    //   it("check if the produced terraform configuration is valid", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestDataSource(stack, "test-data-source", {
    //       name: "foo",
    //     });
    //     new TestResource(stack, "test-resource", {
    //       name: "bar",
    //     });
    //     expect(Testing.fullSynth(app)).toBeValidTerraform();
    //   });
    //   it("check if this can be planned", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestDataSource(stack, "test-data-source", {
    //       name: "foo",
    //     });
    //     new TestResource(stack, "test-resource", {
    //       name: "bar",
    //     });
    //     expect(Testing.fullSynth(app)).toPlanSuccessfully();
    //   });
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXlDLENBQUMsaUNBQWlDO0FBQzNFLG1DQUFtQztBQUVuQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLHNFQUFzRTtJQUN0RSx5QkFBeUI7SUFDekIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVCLGlHQUFpRztJQUNqRyxvREFBb0Q7SUFDcEQsNENBQTRDO0lBQzVDLG1FQUFtRTtJQUNuRSxjQUFjO0lBQ2Qsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxXQUFXO0lBQ1gsbUNBQW1DO0lBRW5DLGNBQWM7SUFDZCx3Q0FBd0M7SUFDeEMsOERBQThEO0lBQzlELFdBQVc7SUFDWCx3RUFBd0U7SUFDeEUsUUFBUTtJQUNSLE1BQU07SUFFTixtREFBbUQ7SUFDbkQscUNBQXFDO0lBQ3JDLGlDQUFpQztJQUNqQyxxREFBcUQ7SUFFckQsNENBQTRDO0lBQzVDLHdCQUF3QjtJQUN4QixVQUFVO0lBRVYsd0NBQXdDO0lBQ3hDLDZCQUE2QjtJQUM3QixVQUFVO0lBRVYsc0RBQXNEO0lBQ3RELFFBQVE7SUFFUixtREFBbUQ7SUFDbkQsY0FBYztJQUNkLHdDQUF3QztJQUN4QywwREFBMEQ7SUFDMUQseUJBQXlCO0lBQ3pCLGNBQWM7SUFFZCxxREFBcUQ7SUFDckQseUJBQXlCO0lBQ3pCLGNBQWM7SUFDZCxXQUFXO0lBQ1gsaUNBQWlDO0lBQ2pDLFFBQVE7SUFDUixNQUFNO0lBRU4sd0NBQXdDO0lBQ3hDLHlFQUF5RTtJQUN6RSxpQ0FBaUM7SUFDakMscURBQXFEO0lBRXJELHNEQUFzRDtJQUN0RCxxQkFBcUI7SUFDckIsVUFBVTtJQUVWLGlEQUFpRDtJQUNqRCxxQkFBcUI7SUFDckIsVUFBVTtJQUNWLDJEQUEyRDtJQUMzRCxRQUFRO0lBRVIsK0NBQStDO0lBQy9DLGlDQUFpQztJQUNqQyxxREFBcUQ7SUFFckQsc0RBQXNEO0lBQ3RELHFCQUFxQjtJQUNyQixVQUFVO0lBRVYsaURBQWlEO0lBQ2pELHFCQUFxQjtJQUNyQixVQUFVO0lBQ1YsMkRBQTJEO0lBQzNELFFBQVE7SUFDUixNQUFNO0FBQ1IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJjZGt0Zi9saWIvdGVzdGluZy9hZGFwdGVycy9qZXN0XCI7IC8vIExvYWQgdHlwZXMgZm9yIGV4cGVjdCBtYXRjaGVyc1xuLy8gaW1wb3J0IHsgVGVzdGluZyB9IGZyb20gXCJjZGt0ZlwiO1xuXG5kZXNjcmliZShcIk15IENES1RGIEFwcGxpY2F0aW9uXCIsICgpID0+IHtcbiAgLy8gVGhlIHRlc3RzIGJlbG93IGFyZSBleGFtcGxlIHRlc3RzLCB5b3UgY2FuIGZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhdFxuICAvLyBodHRwczovL2Nkay50Zi90ZXN0aW5nXG4gIGl0LnRvZG8oXCJzaG91bGQgYmUgdGVzdGVkXCIpO1xuXG4gIC8vIC8vIEFsbCBVbml0IHRlc3RzIHRlc3QgdGhlIHN5bnRoZXNpc2VkIHRlcnJhZm9ybSBjb2RlLCBpdCBkb2VzIG5vdCBjcmVhdGUgcmVhbC13b3JsZCByZXNvdXJjZXNcbiAgLy8gZGVzY3JpYmUoXCJVbml0IHRlc3RpbmcgdXNpbmcgYXNzZXJ0aW9uc1wiLCAoKSA9PiB7XG4gIC8vICAgaXQoXCJzaG91bGQgY29udGFpbiBhIHJlc291cmNlXCIsICgpID0+IHtcbiAgLy8gICAgIC8vIGltcG9ydCB7IEltYWdlLENvbnRhaW5lciB9IGZyb20gXCIuLy5nZW4vcHJvdmlkZXJzL2RvY2tlclwiXG4gIC8vICAgICBleHBlY3QoXG4gIC8vICAgICAgIFRlc3Rpbmcuc3ludGhTY29wZSgoc2NvcGUpID0+IHtcbiAgLy8gICAgICAgICBuZXcgTXlBcHBsaWNhdGlvbnNBYnN0cmFjdGlvbihzY29wZSwgXCJteS1hcHBcIiwge30pO1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgKS50b0hhdmVSZXNvdXJjZShDb250YWluZXIpO1xuXG4gIC8vICAgICBleHBlY3QoXG4gIC8vICAgICAgIFRlc3Rpbmcuc3ludGhTY29wZSgoc2NvcGUpID0+IHtcbiAgLy8gICAgICAgICBuZXcgTXlBcHBsaWNhdGlvbnNBYnN0cmFjdGlvbihzY29wZSwgXCJteS1hcHBcIiwge30pO1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgKS50b0hhdmVSZXNvdXJjZVdpdGhQcm9wZXJ0aWVzKEltYWdlLCB7IG5hbWU6IFwidWJ1bnR1OmxhdGVzdFwiIH0pO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICAvLyBkZXNjcmliZShcIlVuaXQgdGVzdGluZyB1c2luZyBzbmFwc2hvdHNcIiwgKCkgPT4ge1xuICAvLyAgIGl0KFwiVGVzdHMgdGhlIHNuYXBzaG90XCIsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IGFwcCA9IFRlc3RpbmcuYXBwKCk7XG4gIC8vICAgICBjb25zdCBzdGFjayA9IG5ldyBUZXJyYWZvcm1TdGFjayhhcHAsIFwidGVzdFwiKTtcblxuICAvLyAgICAgbmV3IFRlc3RQcm92aWRlcihzdGFjaywgXCJwcm92aWRlclwiLCB7XG4gIC8vICAgICAgIGFjY2Vzc0tleTogXCIxXCIsXG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgbmV3IFRlc3RSZXNvdXJjZShzdGFjaywgXCJ0ZXN0XCIsIHtcbiAgLy8gICAgICAgbmFtZTogXCJteS1yZXNvdXJjZVwiLFxuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIGV4cGVjdChUZXN0aW5nLnN5bnRoKHN0YWNrKSkudG9NYXRjaFNuYXBzaG90KCk7XG4gIC8vICAgfSk7XG5cbiAgLy8gICBpdChcIlRlc3RzIGEgY29tYmluYXRpb24gb2YgcmVzb3VyY2VzXCIsICgpID0+IHtcbiAgLy8gICAgIGV4cGVjdChcbiAgLy8gICAgICAgVGVzdGluZy5zeW50aFNjb3BlKChzdGFjaykgPT4ge1xuICAvLyAgICAgICAgIG5ldyBUZXN0RGF0YVNvdXJjZShzdGFjaywgXCJ0ZXN0LWRhdGEtc291cmNlXCIsIHtcbiAgLy8gICAgICAgICAgIG5hbWU6IFwiZm9vXCIsXG4gIC8vICAgICAgICAgfSk7XG5cbiAgLy8gICAgICAgICBuZXcgVGVzdFJlc291cmNlKHN0YWNrLCBcInRlc3QtcmVzb3VyY2VcIiwge1xuICAvLyAgICAgICAgICAgbmFtZTogXCJiYXJcIixcbiAgLy8gICAgICAgICB9KTtcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICkudG9NYXRjaElubGluZVNuYXBzaG90KCk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xuXG4gIC8vIGRlc2NyaWJlKFwiQ2hlY2tpbmcgdmFsaWRpdHlcIiwgKCkgPT4ge1xuICAvLyAgIGl0KFwiY2hlY2sgaWYgdGhlIHByb2R1Y2VkIHRlcnJhZm9ybSBjb25maWd1cmF0aW9uIGlzIHZhbGlkXCIsICgpID0+IHtcbiAgLy8gICAgIGNvbnN0IGFwcCA9IFRlc3RpbmcuYXBwKCk7XG4gIC8vICAgICBjb25zdCBzdGFjayA9IG5ldyBUZXJyYWZvcm1TdGFjayhhcHAsIFwidGVzdFwiKTtcblxuICAvLyAgICAgbmV3IFRlc3REYXRhU291cmNlKHN0YWNrLCBcInRlc3QtZGF0YS1zb3VyY2VcIiwge1xuICAvLyAgICAgICBuYW1lOiBcImZvb1wiLFxuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIG5ldyBUZXN0UmVzb3VyY2Uoc3RhY2ssIFwidGVzdC1yZXNvdXJjZVwiLCB7XG4gIC8vICAgICAgIG5hbWU6IFwiYmFyXCIsXG4gIC8vICAgICB9KTtcbiAgLy8gICAgIGV4cGVjdChUZXN0aW5nLmZ1bGxTeW50aChhcHApKS50b0JlVmFsaWRUZXJyYWZvcm0oKTtcbiAgLy8gICB9KTtcblxuICAvLyAgIGl0KFwiY2hlY2sgaWYgdGhpcyBjYW4gYmUgcGxhbm5lZFwiLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCBhcHAgPSBUZXN0aW5nLmFwcCgpO1xuICAvLyAgICAgY29uc3Qgc3RhY2sgPSBuZXcgVGVycmFmb3JtU3RhY2soYXBwLCBcInRlc3RcIik7XG5cbiAgLy8gICAgIG5ldyBUZXN0RGF0YVNvdXJjZShzdGFjaywgXCJ0ZXN0LWRhdGEtc291cmNlXCIsIHtcbiAgLy8gICAgICAgbmFtZTogXCJmb29cIixcbiAgLy8gICAgIH0pO1xuXG4gIC8vICAgICBuZXcgVGVzdFJlc291cmNlKHN0YWNrLCBcInRlc3QtcmVzb3VyY2VcIiwge1xuICAvLyAgICAgICBuYW1lOiBcImJhclwiLFxuICAvLyAgICAgfSk7XG4gIC8vICAgICBleHBlY3QoVGVzdGluZy5mdWxsU3ludGgoYXBwKSkudG9QbGFuU3VjY2Vzc2Z1bGx5KCk7XG4gIC8vICAgfSk7XG4gIC8vIH0pO1xufSk7XG4iXX0=