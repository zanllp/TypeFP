type _Base = any[]

/**
 * 删除数组最前面（头部）的元素，并返回这个数组
 */
export type Shift<T extends _Base> = 
    T extends [infer A, ...infer B] 
        ? B 
        : never

/**
 * 返回数组最后一个数
 */
export type Last<T extends _Base> =
    T['length'] extends 0
        ? undefined
        : T['length'] extends 1
            ? T[0]
            : Last<Shift<T>>

/**
 * 生成一个INT
 * @param T 初始化数
 */
export type Int<T extends number, C extends _Base = []> =
    C['length'] extends T
        ? C
        : Int<T, [...C, undefined]>

export type Len<T extends _Base> = T['length']

/**
 * 解包，把Int转成数字字面量
 */
export type Unpack<T extends _Base> = Len<T>

/**
 * []的alias
 */
export type Index<T extends _Base, I extends number> = T[I]

/**
 * 对一个int进行加法，返回一个新的int
 */
export type Plus<Lhs extends _Base, Rhs extends _Base = Int<1>> = [...Lhs, ...Rhs]

/**
 * 减法
 */
export type Subtract<Lhs extends _Base, Rhs extends _Base = Int<1>> =
    Rhs extends Int<0>
        ? Lhs
        : Subtract<Shift<Lhs>, Shift<Rhs>>

/**
 * 将长度限制
 * @param T  数组
 * @param L 长度
 * @param R 每次递归的结果
 * @param I 深度
 */
export type MaxLen<T extends _Base, L extends _Base = Int<0>, R extends _Base = [], I extends _Base = Int<0>> =
    L extends Int<0>
        ? T
        : I extends L
            ? R 
            : MaxLen<T, L, [...R, T[Unpack<I>]], Plus<I>>

/**
 * @param T  数组
 * @param S 开始位置
 * @param L 长度，默认截到末尾
 */
export type Slice<T extends _Base, S extends _Base, L extends _Base = Int<0>> =
    S extends Int<0>
        ? MaxLen<T, L>
        : Slice<Shift<T>, Subtract<S>, L>
        