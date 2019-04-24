import React from 'react';

export const SettingsInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Settings Button</h2>
        <ul>
            <li>This is the place where you can filter sets, set the enhancement level for all sets and more...</li>
        </ul>
        <h4 className="col-12 pb-2"><u>Filters</u></h4>
        <ul>
            <li>You will find 3 filters: Category, Bonus Type and Arts per Set. <ul>
                <li>Selecting a Category means only sets in this category will be shown in the list.</li>
                <li>Selecting a Bonus Type means only sets with the corresponding stat will be shown in the list.</li>
                <li>Selecting a number of Arts per Set means only sets that have the same number of artifacts as the selection will be shown.</li>
                <li>Each filter is cumulative! I.E: you can show only sets from Raid that have the Game Speed stats and 4 artifacts!</li>
            </ul>
            </li>
        </ul>
        <h4 className="col-12 pb-2"><u>Enhancement</u></h4>
        <ul>
            <li>There are 2 mods to apply enhancements:
                <ul>
                    <li>Manual mode will let you enhance every set manually on your own.</li>
                    <li>"All" mode is more like an automatic mode, it will change every set enhancement in one click.</li>
                    <li><i>A little trick is to set the overall enhancement with automatic mode and get finer in manual after! ;)</i></li>
                </ul>
            </li>
            <li>Please notice that if you select +4 in "All" mode, every set will adjust in accordance to its max enhancement possible.</li>
        </ul>
        <h4 className="col-12 pb-2"><u>Sets Levels</u></h4>
        <ul>
            <li>This button will appear only in auto-buider mode.</li>
            <li>It will let you chose with which sets levels the auto-builder should work.</li>
            <li>Please notice that you can't change each set level manually.</li>
        </ul>
    </div>
);