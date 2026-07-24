import path from "path";
import fs from "fs";
import * as yaml from "js-yaml";

//définition d'une interface pour structurer les données de payement
interface LoginConfig{
    urlTest: string;
    urlPreprod: string;
    login: string;
}

interface PaymentConfig{
    
    cardName: string;
    cardNumber: string;
    cvc: string;
    expirationMonth: string;
    expirationYear: string;
}


export interface AppConfig{
    [x: string]: any;

    payment: PaymentConfig;
    environnement: LoginConfig;
}

//fonction pour charger le fichier yaml

function loadConfig() : AppConfig {

    //constuire le chemin vers config.yaml
    const configPath= path.resolve(__dirname, 'config.yaml');

    //lire la fichier yaml
    const file= fs.readFileSync(configPath, 'utf-8');

    //parser le fichier en objet javascript
    const yamlData= yaml.load(file) as any;

    //retourner l'objet généré
    return{
        payment: yamlData.payment,
        environnement: yamlData.environnement,
    };    
}

export const config = loadConfig();
