import { Request, Response, Router } from "express";
import Toode from "../models/Toode"

const router: Router = Router();

const tooted: Toode[] = [
    new Toode(1, "Koola", 1.5, true),
    new Toode(2,"Fanta", 1.0, false),
    new Toode(3,"Sprite", 1.7, true),
    new Toode(4,"Vichy", 2.0, true),
    new Toode(5,"Vitamin well", 2.5, true)
];

router.get("/tooted", (req: Request, res: Response) => {
    res.send(tooted)
})

router.get("/kustuta-toode/:index", (req: Request, res: Response) => {
    tooted.splice(Number(req.params.index),1)
    res.send(tooted)
});

router.get("/kustuta-toode-variant2/:index", (req: Request, res: Response) => {
    tooted.splice(Number(req.params.index), 1)
    res.send("Toode kustutatud!")
})

router.get("/lisa-toode/:id/:nimi/:hind/:aktiivne", (req: Request, res: Response) => {
    tooted.push(
        new Toode(
            Number(req.params.id),
            req.params.nimi,
            Number(req.params.hind),
            req.params.aktiivne === "true"
        )
    )
    res.send(tooted)
})

router.get("/hind-dollaritesse/:kurss", (req: Request, res: Response) => {
    for (let index = 0; index < tooted.length; index++) {
        tooted[index].price = tooted[index].price * Number(req.params.kurss);
    }
    res.send(tooted)
})

export default router;