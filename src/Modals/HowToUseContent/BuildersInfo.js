import React from 'react';

export const AutomaticBuilderInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Automatic Builder</h2>
        <ul>
            <li>
                Fill the corresponding inputs at the top of the screen and click the <b>Build</b> button. The summary list will update
                and show you the best result the algorithm found based on your conditions.
            </li>
            <li>
                Click on the <button style={{ width: '30px' }} className="text-center text-color personnal-checkbox"><i>X</i></button> or the <button style={{ width: '30px' }} className="text-center text-color personnal-checkbox"><i>V</i></button> mark above each set to let the auto-builder know if it should take it in account or not.
            </li>
            <li>
                You can select the enhancement level of the set, the auto-builder will know how to handle with it, watch the <b>Options</b> tab for more info.
            </li>
        </ul>
        <h4 className="col-12 pb-2"><u>Additionnal Informations</u></h4>
        <ul>
            <li>Algorithm is working this way:
            <ul>
                    <li>Orders selected sets by a GS/(Number of arts per set) ratio.
            <ul>
                            <li>I.E: +3 T2 Halloween set has 2 artifacts and 44% GS. Its GS/art is 22%.</li>
                            <li>I.E2: +3 T2 AR (R1) set has 4 artifacts and 73% GS. Its GS/art is 18.25%, he will be further in the list than the previous example.</li>
                        </ul>
                    </li>
                    <li>Takes every set in the previous ordered manner untill GS has been caped (without getting above)</li>
                    <li>Fills the rest with maximum medals possible.</li>
                </ul>
            </li>
        </ul>
        <h4 className="col-12 pb-2"><u>Tips & Tricks</u></h4>
        <ul>
            <li>Based on the Additionnal Informations, if you want to have less GS in your build, don't forget to remove the high GS ratio sets. This way you will ensure to have maximum medals possible.
                                <ul>
                    <li>I.E: You have 400% GS, you want to have a bit less around 370%, remove the Airships sets!
                                        <ul>
                            <li><i>Why?</i></li>
                            <li>Because Airships sets have a very high ratio of GS/Art but a medium ratio of Medals/Art!</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>Try to play around with the GS value to see if you can find a nice solution around your required GS. Being overcapped is not that much a problem since it will prevent you to swap arts for the next few KLs! ;)</li>
            <li>You can use the auto-builder to create a base to fill your slots. Feel free to swap to manual-builder to find better combinations.
                                <ul>
                    <li>
                        <b>It is even recommended since the algorithm is from my own adaptation and its results can sometimes be pushed further!</b></li>
                </ul>
            </li>
        </ul>
    </div>
);

export const ManualBuilderInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Manual Builder</h2>
        <ul>
            <li>
                For each set you will have a "box". This box contains many buttons and lines:
                <ul>
                    <li>The <button style={{ width: '30px' }} className="text-center text-color personnal-checkbox"><i>X</i></button> button, selected by default, is showing that the set is not selected.</li>
                    <li>You will then find multiple lines (T0, T1, T2...). Each line represents the Tier of the set. You can select the number of arts you want for the tier you want by clicking on the corresponding button (<button style={{ width: '30px' }} className="text-center text-color personnal-checkbox">2</button>, <button style={{ width: '30px' }} className="text-center text-color personnal-checkbox">4</button>, etc...). After a set has been selected, it will appear in the Summary List.</li>
                    <li>If enhancement is available for the set, you will have the possibility to select which level of enhancement you want for the set. As in Endless Frontier, enhancement will be taken in account only if you have the whole set selected. For more informations about how enhancement is working, see the Options tab.</li>
                    <li>You will then see the "Technical Name" (Abreviation used by players mostly). You can click on it to find more infos about the set such as its stats.</li>
                    <li>Then the real set's name.</li>
                    <li>And finally which artifacts are composing the set. You can click on the artifacts to have more info such as their stats.</li>
                </ul>
            </li>
        </ul>
        <h4 className="col-12 pb-2"><u>Additionnal Informations</u></h4>
        <ul>
            <li>When you change a set's enhancement level it will be updated automatically in the summary list.</li>
            <li>In set's informations modal you only have the base stats shown. Enhancement is not taken in account. Simply add it to the summary list to preview it!</li>
            <li>If you change manually a set's enhancement level, it will be keep even if you swap form auto-builder to manual-builder (and vice-versa)!</li>
        </ul>
    </div>
);