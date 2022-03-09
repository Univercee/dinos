import ObjectState from "./ObjectState"

interface KeyHundler{
    (state: ObjectState): ObjectState
}

export default KeyHundler