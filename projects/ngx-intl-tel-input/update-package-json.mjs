import rootPackageJson from '../../package.json' with {type: 'json'};
import packageJson from './package.json' with {type: 'json'};
import {writeFileSync} from "node:fs";

console.log(rootPackageJson);
console.log(packageJson);

packageJson.version = rootPackageJson.version;
packageJson.peerDependencies = Object.keys(packageJson.peerDependencies).reduce((acc, key) => {
    acc[key] = rootPackageJson.dependencies[key]
        || rootPackageJson.devDependencies[key];
    return acc;
}, {});

writeFileSync('./package.json', JSON.stringify(packageJson, null, 2), 'utf-8');
