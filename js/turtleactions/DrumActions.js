/**
 * @file This contains the action methods of the Turtle's Singer component's Drum blocks.
 * @author Anindya Kundu
 * @author Walter Bender
 *
 * @copyright 2014-2020 Walter Bender
 * @copyright 2020 Anindya Kundu
 *
 * @license
 * This program is free software; you can redistribute it and/or modify it under the terms of the
 * The GNU Affero General Public License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * You should have received a copy of the GNU Affero General Public License along with this
 * library; if not, write to the Free Software Foundation, 51 Franklin Street, Suite 500 Boston,
 * MA 02110-1335 USA.
*/

/**
 * Sets up all the methods related to different actions for each block in Drum palette.
 *
 * @returns {void}
 */
function setupDrumActions() {
    Singer.DrumActions = class {
        /**
         * Generate white, pink, or brown noise.
         *
         * @param {String} noise - noise name
         * @param {Number} turtle - Turtle index in turtles.turtleList
         * @param {Number} blk - corresponding Block index in blocks.blockList
         */
        static playNoise(noise, turtle, blk) {
            let noisename = noise;
            for (let n in NOISENAMES) {
                if (NOISENAMES[n][0] === noise) {
                    noisename = NOISENAMES[n][1];
                    break;
                } else if (NOISENAMES[n][1] === noise) {
                    noisename = noise;
                    break;
                }
            }

            let tur = logo.turtles.ithTurtle(turtle);

            if (tur.singer.inNoteBlock.length > 0) {
                // Add the noise sound as if it were a drum
                tur.singer.noteDrums[last(tur.singer.inNoteBlock)].push(noisename);
                if (tur.singer.synthVolume[noisename] === undefined) {
                    tur.singer.synthVolume[noisename] = [DEFAULTVOLUME];
                    tur.singer.crescendoInitialVolume[noisename] = [DEFAULTVOLUME];
                }
                tur.singer.noteBeatValues[last(tur.singer.inNoteBlock)].push(tur.singer.beatFactor);

                tur.singer.pushedNote = true;
            } else {
                logo.errorMsg(_("Noise Block: Did you mean to use a Note block?"), blk);
                return;
            }
        }
    }
}
