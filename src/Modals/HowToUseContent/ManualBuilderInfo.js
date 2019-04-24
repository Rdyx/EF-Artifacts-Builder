import React from 'react';

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