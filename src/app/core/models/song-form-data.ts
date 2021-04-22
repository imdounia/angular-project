import { Song } from "./song";

export interface SongFormData {
    toUpdate: boolean;
    song: Song;
}