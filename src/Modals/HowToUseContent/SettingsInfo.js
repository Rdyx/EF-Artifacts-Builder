import React from 'react';

export const FiltersInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Filters</h2>
        <ul>
            <li>You will find 3 filters: Category, Bonus Type and Arts per Set. <ul>
                <li>Selecting a Category means only sets in this category will be shown in the list.</li>
                <li>Selecting a Bonus Type means only sets with the corresponding stat will be shown in the list.</li>
                <li>Selecting a number of Arts per Set means only sets that have the same number of artifacts as the selection will be shown.</li>
                <li>Each filter is cumulative! I.E: you can show only sets from Raid that have the Game Speed stats and 4 artifacts!</li>
            </ul>
            </li>
        </ul>
    </div>
);

export const EnhancementsInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Enhancement</h2>
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
    </div>
);

export const SetsLevelsInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Sets Levels</h2>
        <ul>
            <li>This button will appear only in auto-buider mode.</li>
            <li>It will let you chose with which sets levels the auto-builder should work.</li>
            <li>Please notice that you can't change each set level manually.</li>
        </ul>
    </div >
);

export const SortingInfo = (
    <div className="row">
        <h2 className="col-12 version-underline pb-2 text-center">Sorting</h2>
        <ul>
            <li>You can sort sets by certain values:
                <ul>
                    <li>Arts per Set: Number of art per set.</li>
                    <li>Alphabetical: Alphabetical order based on sets' technical names.</li>
                    <li>GS Amount: Game Speed Amount.</li>
                    <li>Medals Amount: Bonus Medals Amount.</li>
                </ul>
            </li>
            <li>You can sort in two orders:
                <ul>
                    <li>ASC: Ascendant order (A -> Z, 0 -> +n...).</li>
                    <li>DESC: Descendant order (Z -> A, +n -> 0...).</li>
                </ul>
            </li>
            <li>You can cumulate multiple orders.
                <ul>
                    <li>I.E: Clicking on <b>GS Amount DESC</b> then on <b>Medals Amount DESC</b> will sort sets firstly by their amount of GS and then by their medals in DESC order.
                    <ul>
                            <li>50% GS / 1000% Medals -> 50% GS -> 500% Medals -> 30% GS / 1000% Medals...</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>To reset the order, simply click on <b>Default</b>.</li>
        </ul>
    </div >
);