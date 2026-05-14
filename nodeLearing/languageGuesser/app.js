import { franc } from "franc";
import langs from "langs";
import color from "colors";
const input = process.argv[2];
const languageCode = (franc(input));

if (languageCode === 'und') {
    console.log("Sorry can't detect language. Please try again!".red);
} else {
    const actualLanguage = langs.where("3", languageCode);
    console.log(`Our best guess is: ${actualLanguage.name}`.green);
}
