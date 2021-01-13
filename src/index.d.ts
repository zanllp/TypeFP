type BaseType<T = any> = T[]

/**
 * 删除数组最前面（头部）的元素，并返回这个数组
 */
export type Shift<T extends BaseType> =
    T extends [infer A, ...infer B]
        ? B
        : never

/**
 * 返回数组最后一个数
 */
export type Last<T extends BaseType> =
    T['length'] extends 0
        ? undefined
        : T['length'] extends 1
            ? T[0]
            : Last<Shift<T>>

export type Absolute<T extends number> =
    `${T}` extends `-${infer neg}`
        ? ToNumber<neg>
        : T

export type ToNumber<S extends string, T extends BaseType = []> =
    S extends `${T["length"]}`
        ? T["length"]
        : ToNumber<S, [...T, any]>

export type LessThanZero<T extends number> = `${T}` extends `-${infer neg}` ? true : false

/**
 * 生成一个INT
 * @param T 初始化数
 */
export type Int<T extends number, C extends BaseType = [], P extends boolean = true> =
    LessThanZero<T> extends true
        ? Int<Absolute<T>, C, false>
        : C['length'] extends T
            ? [C, P]
            : Int<T, [...C, null], P>

type IntType = [BaseType, boolean]
type UintType = [BaseType, true]

export type Len<T extends BaseType> = T['length']

/**
 * 解包，把Int转成数字字面量,负数是字符串字面量
 */
export type Unpack<T extends IntType> = T[1] extends true ? Len<T[0]> : `-${Len<T[0]>}`

/**
 * []的alias
 */
export type Index<T extends BaseType, I extends number> = T[I]


export type Compare<A, B> = A extends B ? true : false

/**
 * 无符号比较
 * A 小于 B返回true
 */
export type LessThanU<A extends UintType, B extends UintType> = 
    A extends Int<0>
        ? B extends Int<0>
            ? false // 相等
            : true // B 大于 A
        : B extends Int<0>
            ? false
            : LessThanU<[Shift<A[0]>, true], [Shift<B[0]>, true]>
            
/**
 * 比较
 * A 小于 B返回true
 */
export type LessThan<A extends IntType, B extends IntType> = 
    A[1] extends true
        ? B[1] extends true
            ? LessThanU<[A[0], true], [B[0], true]>
            : false
        : B[1] extends true
            ? true
            : LessThanU<[B[0], true], [A[0], true]>


/**
 * 对一个int进行加法，返回一个新的int
 */
export type Plus<A extends IntType, B extends IntType = Int<1>> =
    A[1] extends true
        ? B[1] extends true
            ? [[...A[0], ...B[0]], true] // a + b
            : Subtract<A, [B[0], true]> // a + -b = a - b
        : B[1] extends true
            ? Subtract<B, [A[0], true]> // -a + b = b - a
            : [[...A[0], ...B[0]], false] // -a + -b = -(1+1)

/**
 * 减法
 */
export type Subtract<A extends IntType, B extends IntType = Int<1>> =
    A[1] extends true
        ? B[1] extends true
            ? B extends Int<0> // a - b, B先到0
                ? A
                : A extends Int<0> // a 先到0
                    ? [B[0], false]
                    : Subtract<[Shift<A[0]>, true], [Shift<B[0]>, true]>
            : Plus<A, [B[0], true]> // a - -b = a + b
        : B[1] extends true
            ? [[...A[0], ...B[0]], false] // -a - b = - (a+b)
            : Subtract<[B[0], true], [A[0], true]> // -a - -b = b-a

/**
 * 乘法
 * @param A，B  乘号左右
 * @param R 每次递归的结果
 * @param I 深度
 */
export type Multiply<A extends IntType, B extends IntType, R extends IntType = Int<0>, L extends IntType = Int<0>> =
    B[1] extends false 
        ? A[1] extends true // b 小于 0
            ? Multiply<[A[0], false],[B[0], true]> // A大于0
            : Multiply<[A[0], true],[B[0], true]> // A小于0
        : L extends B
            ? R
            : Multiply<A, B, Plus<A, R>, Plus<L>>


/**
 * 无符号除法
 * @param A，B  左右
 * @param R 每次递归的结果
 * @param I 深度
 */
export type DivideU<A extends UintType, B extends UintType, R extends IntType = Int<0>, L extends IntType = Int<0>> = 
    B extends Int<0>
        ? never
        : LessThan<A, R> extends true 
            ? Subtract<L>
            : DivideU<A, B, Plus<R, B>, Plus<L>>
/**
 * 除法
 * A 小于 B返回true
 */
export type Divide<A extends IntType, B extends IntType> = 
    A[1] extends true
        ? B[1] extends true
            ? DivideU<[A[0], true], [B[0], true]>
            : [[...DivideU<[A[0], true], [B[0], true]>][0], false]
        : B[1] extends true
            ? [[...DivideU<[A[0], true], [B[0], true]>][0], false]
            :  DivideU<[A[0], true], [B[0], true]>
        

/**
 * 将长度限制
 * @param T  数组
 * @param L 长度
 * @param R 每次递归的结果
 * @param I 深度
 */
export type MaxLen<T extends BaseType, L extends IntType = Int<-1>, R extends BaseType = [], I extends IntType = Int<0>> =
    L extends Int<-1>
        ? T
        : I extends L
            ? R
            : MaxLen<T, L, [...R, T[Unpack<[I[0], true]>]], Plus<I>>


            
/**
 * @param T  数组
 * @param S 开始位置
 * @param L 长度，默认截到末尾
 */
export type Slice<T extends BaseType, S extends IntType, L extends IntType = Int<-1>> =
    S extends Int<0>
        ? MaxLen<T, L>
        : Slice<Shift<T>, Subtract<S>, L>
