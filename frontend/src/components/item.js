const mainfunction = (func) => {
    let a = 1
    func(a)
}

const increment = (num) => {
    num += 1
}

mainfunction(increment)