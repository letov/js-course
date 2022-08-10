import * as fs from 'fs'

const curDir = process.argv.slice(2)[0] ?? ''
const path = `${process.cwd()}/${curDir}`

if (!fs.existsSync(path)) {
    throw new Error('dir not exist')
}

const getData = async (path) => {
    let data = {}
    data.dirs = []
    data.files = []
    const files = await fs.promises.readdir(path)
    for (const file of files) {
        const fullPath = `${path}/${file}`
        const value = fullPath.slice(process.cwd().length);
        if (fs.lstatSync(fullPath).isDirectory()) {
            data.dirs.push(value)
            const subData = await getData(fullPath)
            data.dirs.push(...subData.dirs)
            data.files.push(...subData.files)
        } else {
            data.files.push(value)
        }
    }
    return data
}

const data = await getData(path)
data.dirs.push(`/${curDir}`);
data.dirs.sort();
console.log(data)