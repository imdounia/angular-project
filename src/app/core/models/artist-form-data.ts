import { Artist } from "./artist";


export interface ArtistFormData {
    toUpdate: boolean;
    artist: Artist;
}