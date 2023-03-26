export function AddOrRemoveFromArray(array, item) {
    const exists = array.includes(item)

    if (exists) {
        return array.filter((x) => { return x !== item })
    } else {
        array.push(item)
        return array
    }
}