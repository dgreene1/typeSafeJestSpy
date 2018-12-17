
type ResolvedPromise<T> = T extends Promise<infer R> ? R : T;

// tslint:disable-next-line:no-any
type IFunction = (...args: any[])=>any;

export interface ITypeSafeSpy<TRealFuncImpl extends IFunction> extends jest.SpyInstance {
    mockImplementation: (mockImplFunc: TRealFuncImpl) => jest.Mock;
    mockImplementationOnce: (mockImplFunc: TRealFuncImpl) => jest.Mock;
    mockResolvedValue: (valueToReturn: ResolvedPromise<ReturnType<TRealFuncImpl>>) => jest.Mock;
    mockResolvedValueOnce: (valueToReturn: ResolvedPromise<ReturnType<TRealFuncImpl>>) => jest.Mock;
}


export const typeSafeSpyWrapper = <TRealFunc extends IFunction>(aSpy: jest.SpyInstance<TRealFunc>): ITypeSafeSpy<TRealFunc> => {

    const safeSpy = aSpy as ITypeSafeSpy<TRealFunc>;

    return safeSpy;
}