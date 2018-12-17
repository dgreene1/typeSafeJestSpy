import { typeSafeSpyWrapper } from "../src";
import * as aModuleToMock from './aModuleToMock';


describe("typeSafeSpyWrapper", ()=>{

    describe("allows type-safe use of Jest's mockResolvedValue", ()=>{

        it("where simple types can be automatically inferred", async ()=>{
            // Arrange
            const aTypeSafeSpy = typeSafeSpyWrapper(jest.spyOn(aModuleToMock, "getUserById"), aModuleToMock.getUserById);
            const expectedResult = {
                age: 23,
                id: 12345,
                userName: "Mr. Nemo"
            };

            // Act
            // set up the spy to return the value just as you normally would; however, the spy function requires you to pass the correct type
            aTypeSafeSpy.mockResolvedValue(expectedResult)
            // call the code you want to test so you can validate that the spy returned the correct result
            const result = await aModuleToMock.getUserById(expectedResult.id);

            // Assert
            expect(result.age).toBe(expectedResult.age);
            expect(result.id).toBe(expectedResult.id);
            expect(result.userName).toBe(expectedResult.userName);
        });

        it("but complex types might need to have their return types explicitly declared", async ()=>{
            // Arrange
            const aTypeSafeSpy = typeSafeSpyWrapper(jest.spyOn(aModuleToMock, "getUserById"), aModuleToMock.getUserById);

            // // We can't pass in this implicit object to our spy because it can't infer the private type for favoriteColor. It thinks it's a string...
            // //   ... "Argument of type '{ age: number; id: number; userName: string; favoriteColor: string; }' is not assignable to parameter of type 'IUser'."
            // //   ... hence why we've commented it out
            // const expectedResult = {
            //     age: 23,
            //     id: 12345,
            //     userName: "Mr. Nemo",
            //     favoriteColor: "blue"
            // };

            // However, the explicitly declared version works just fine
            const expectedResult : aModuleToMock.IUser = {
                age: 23,
                id: 12345,
                userName: "Mr. Nemo",
                favoriteColor: "blue"
            };

            // Act
            // set up the spy to return the value just as you normally would; however, the spy function requires you to pass the correct type
            aTypeSafeSpy.mockResolvedValue(expectedResult)
            // call the code you want to test so you can validate that the spy returned the correct result
            const result = await aModuleToMock.getUserById(expectedResult.id);

            // Assert
            expect(result.age).toBe(expectedResult.age);
            expect(result.id).toBe(expectedResult.id);
            expect(result.userName).toBe(expectedResult.userName);
        });

        it("however, complex types can still be inferred as long as you instantiate the object in-line with the spy function", async ()=>{
            // Arrange
            const aTypeSafeSpy = typeSafeSpyWrapper(jest.spyOn(aModuleToMock, "getUserById"), aModuleToMock.getUserById);

            // Act
            // set up the spy to return the value just as you normally would; however, the spy function requires you to pass the correct type
            aTypeSafeSpy.mockResolvedValue({
                age: 23,
                id: 12345,
                userName: "Mr. Nemo",
                favoriteColor: "blue"
            });
            // call the code you want to test so you can validate that the spy returned the correct result
            const doesntMatterWhatIdBecauseImMockingTheResult = 4504959;
            const result = await aModuleToMock.getUserById(doesntMatterWhatIdBecauseImMockingTheResult);

            // Assert
            expect(result.age).toBe(23);
            expect(result.id).toBe(12345);
            expect(result.userName).toBe("Mr. Nemo");
            expect(result.favoriteColor).toBe("blue");
        });
    });

    describe("allows type-safe use of Jest's mockImplementation", ()=>{

        it("where simple types can be automatically inferred", async ()=>{
            // Arrange
            const aTypeSafeSpy = typeSafeSpyWrapper(jest.spyOn(aModuleToMock, "getUserById"), aModuleToMock.getUserById);
            const expectedResult = {
                age: 23,
                id: 12345,
                userName: "Mr. Nemo"
            };

            // Act
            // set up the spy to return the value just as you normally would
            aTypeSafeSpy.mockImplementation((/* notice that even though the real version expects a string id as an input, I am not obligated to use that implementation */) => {
                // However, I must return the correct type
                return Promise.resolve(expectedResult);
            });
            // call the code you want to test so you can validate that the spy returned the correct result
            const result = await aModuleToMock.getUserById(expectedResult.id);

            // Assert
            expect(result.age).toBe(expectedResult.age);
            expect(result.id).toBe(expectedResult.id);
            expect(result.userName).toBe(expectedResult.userName);
        });
    });

});

