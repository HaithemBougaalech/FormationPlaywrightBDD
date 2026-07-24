import { Page } from "@playwright/test";
import { ProduitPage } from "../pages/produitPage";
import { PanierPage } from "../pages/panierPage";

export const pageFixture = {
    //@ts-ignore 
    page: undefined as Page,
    //@ts-ignore 
    produitPage: undefined as ProduitPage,
    //@ts-ignore
    panierPage: undefined as PanierPage,
}

//ligne 5 pour supprimer l'erreur ts sur undefined as Page