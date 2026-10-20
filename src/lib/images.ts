import images from '../data/haile-images.json';
const manifest = images as Record<string,string>;
const normalize = (text:string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');
const aliases: Record<string,string> = {
 'doughnutandcappuccino':'donutandcappuccino', 'kenyantea':'kenyantea',
 'whitechocolatedonut':'glazeddonut','chocolatesprinklesdonut':'chocolatedonut',
 'beefchickensamosa':'beefsamosa','beefkebab':'beefkebab',
 'ngwacinduma':'ngwaciornduma', 'eggrollchicken':'eggrollchicken',
 'cinnamonrollpassioncocktail':'cinnamonrollandpassioncocktail',
 'hailecafelatteblackforestcombo':'cafelatteandblackforestslice',
 'haileicedcoffeesamosacombo':'icedcoffeeand2beefsamosas',
 'hailebutterflypeawingscombo':'butterflypeaandchickenwings',
 'haileshirleytemplehotdogcombo':'shirleytempleandhotdog',
 'hailebluelagoonkebabcombo':'bluelagoonandbeefkebab',
 'strawberrymohito2beefchickensamosas':'strawberrymohitoand2beefchickensamosas',
};
export function haileImage(name: string, id = ''): string | undefined {
 const candidates = [normalize(name), normalize(id).replace(/^haile/, ''), normalize(name.replace(/\s*\([^)]*\)/g,''))];
 for(const key of candidates){const mapped=aliases[key] || key; if(manifest[mapped]) return manifest[mapped];}
 return undefined;
}
export const haileImageCount = Object.keys(manifest).length;
