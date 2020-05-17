export const calculateMedalsFromEnhancement = (bonusMedals, elvl) => {
    return bonusMedals + ((bonusMedals / 2) * elvl);
};

export const calculateGSFromEnhancement = (bonusGS, artLevel, trans, elvl, setType) => {
    if (!bonusGS) {
        return 0;
    };

    const eightStarsSetIsAirship = (setType.match(/Airship/g) && artLevel === '8*');

    function getGS(GSArrays, bonusGS, elvl, eightStarsSetIsAirship) {
        const lvl0 = elvl === 0;
        const lvl1 = elvl === 1;
        const lvl2 = elvl === 2;
        const lvl3 = elvl === 3;
        const lvl4 = elvl === 4;
        const GSValues = eightStarsSetIsAirship ? GSArrays[2] : bonusGS === GSArrays[0][0] ? GSArrays[0] : GSArrays[1];

        return lvl0 ? GSValues[0] : lvl1 ? GSValues[1] : lvl2 ? GSValues[2] : lvl3 ? GSValues[3] : lvl4 ? GSValues[4] : 0;
    };

    // Each number is the elvl equivalent
    // There are 2 arrays because sets GS are divided by 2 different start values
    // 8* is a special case because for some reason, airships and usual gs sets start with the same value (#thankYouEkkor...)
    const defaultStartGSValues = {
        "6*": {
            T0: [[15, 17, 19, 0, 0], [25, 28, 32, 0, 0]],
            T1: [[22, 25, 28, 0, 0], [37, 42, 47, 0, 0]],
            T2: [[26, 29, 33, 0, 0], [45, 51, 57, 0, 0]],
            T3: [[27, 31, 34, 0, 0], [46, 52, 58, 0, 0]],
        },
        "7*": {
            T0: [[23, 26, 30, 33, 0], [37, 43, 48, 54, 0]],
            T1: [[28, 32, 36, 41, 0], [38, 44, 49, 55, 0]],
            T2: [[30, 35, 39, 44, 0], [50, 58, 65, 73, 0]],
            T3: [[33, 41, 44, 74, 0], [51, 59, 66, 74, 0]],
        },
        "8*": {
            T0: [[47, 53, 60, 67, 74], [0, 0, 0, 0, 0], [47, 53, 59, 65, 73]],
            T1: [[51, 59, 66, 74, 77], [0, 0, 0, 0, 0], [49, 55, 61, 67, 75]],
            T2: [[54, 62, 69, 77, 80], [0, 0, 0, 0, 0], [52, 60, 67, 75, 77]],
        },
        "9*": {
            T0: [[52, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
        }
    };

    return getGS(defaultStartGSValues[artLevel][trans], bonusGS, elvl, eightStarsSetIsAirship);
};

// Making a filter method upon existing sets to get the most powerfull ones
export const filterSets = (
    sets, findBonus, excludedFromOptimiser = [], artLevels, sixStarsLevel = 'T3', sevenStarsLevel = 'T3', eightStarsLevel = 'T2',
    nineStarsLevel = 'T0'
) => {
    // Flatting arrays and filtering sets
    let unifiedArray = [];
    sets.map(setArray => {
        return setArray.map(set => {
            const setLevel = set.setLevel;
            const artLevel = set.artifact1.art_level.replace('*', '');
            const setName = set.set_name.replace(/ \(\dp\)/g, '');

            return !artLevel.match(artLevels) ? null :
                (setLevel === sixStarsLevel &&
                    artLevel === '6' &&
                    excludedFromOptimiser.indexOf(setName) === -1) ? unifiedArray.push(set) :
                    (setLevel === sevenStarsLevel &&
                        artLevel === '7' &&
                        excludedFromOptimiser.indexOf(setName) === -1) ? unifiedArray.push(set) :
                        (setLevel === eightStarsLevel &&
                            artLevel === '8' &&
                            excludedFromOptimiser.indexOf(setName) === -1) ? unifiedArray.push(set) :
                            (setLevel === nineStarsLevel &&
                                artLevel === '9' &&
                                excludedFromOptimiser.indexOf(setName) === -1) ? unifiedArray.push(set) : null;
        })
    });


    // Filtering sets to retreive only usefull data
    // Goal is to have lighter data to use with algorithm later
    let objectStyle = [];
    unifiedArray.map(set => {
        const bonusGSValue = findBonus(set, /Game Speed/) ? findBonus(set, /Game Speed/) : 0;
        const bonusMedalsValue = findBonus(set, /Increase Additional Medals Obtained/) ? findBonus(set, /Increase Additional Medals Obtained/) : 0;

        const avgGSByNBArts = bonusGSValue / set.set_arts_number;
        const fullSet = set.set_arts_number === set.set_total_arts_number;

        // Since GS and Medals Bonus are most important bonus, save those sets and flush the rest
        return bonusGSValue || bonusMedalsValue ?
            objectStyle.push({
                'setType': set.setType,
                'setLevel': set.setLevel,
                'set_name': set.set_name.replace(/ \(\dp\)/g, ''),
                // 'set_name': set.set_name,
                'set_tech_name': set.set_tech_name,
                'set_arts_number': set.set_arts_number,
                'set_total_arts_number': set.set_total_arts_number,
                'bonusGS': bonusGSValue,
                'calculatedBonusGS': bonusGSValue ?
                    fullSet ? calculateGSFromEnhancement(bonusGSValue, set.artifact1.art_level, set.setLevel, set.enhance_level, set.setType) : bonusGSValue : 0,
                'bonusMedals': bonusMedalsValue,
                'calculatedBonusMedals': bonusMedalsValue ?
                    fullSet ? calculateMedalsFromEnhancement(bonusMedalsValue, set.enhance_level) : bonusMedalsValue : 0,
                'avgGS': avgGSByNBArts,
                'enhance_level': set.enhance_level ? set.enhance_level : 0,
                'artifact1': set.artifact1,
            }) : null;
    });

    // Sorting each set by its GS/NbArt ratio
    return objectStyle.sort((set1, set2) => {
        return (set1.avgGS - set2.avgGS) * -1;
    });
};

// BASE KNAPSACK CODE AT
// https://gist.github.com/lqt0223/21f033450a9d762ce8aee4da336363b1

// KNAPSACK ALGORITHM MODIFIED A BIT TO FIT THE APP NEEDS
export const knapsack = (
    sets, maxArts, maxGS, minMedalsPerSet, findBonus, excludedFromOptimiser, artLevels, sixStarsLevel, sevenStarsLevel, eightStarsLevel,
    nineStarsLevel,
) => {
    function getSolution(row, nbArts, maxGS, minMedalsPerSet, memo) {
        const NO_SOLUTION = { totalArts: 0, gameSpeed: 0, medalsBonus: 0, sets: [] };

        const col = nbArts - 1;
        const lastItem = sets[row];

        const remaining = nbArts - lastItem.set_arts_number;

        const lastSolution = row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
        const lastSubSolution = row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

        // If any one of the set has too much artifacts, return the last solution
        if (remaining < 0) {
            return lastSolution;
        }

        // Since a set cannot be counted twice (i.e: 2p, 4p and full set), we check if one of its combinaison has already been selected
        // If not, we keep it
        // If yes, we filter all sets matching and push them in a separate array (we would lose them else)
        const lastItemName = lastItem.set_name;

        let filteredSets = [];

        lastSubSolution.sets = lastSubSolution.sets.filter(set => {
            const currentSetName = set.set_name;

            if (currentSetName === lastItemName) {
                filteredSets.push(set);
                return false;
            } else {
                return true;
            }
        });

        // If a set was already existing, the last solution hasn't changed so we don't need to go further.
        // Simply push the first one again and return the solution
        if (filteredSets[0]) {
            lastSubSolution.sets.push(filteredSets[0]);
            return lastSubSolution;
        }

        const lastGSValue = lastSolution.gameSpeed;
        const lastMedalsValue = lastSolution.medalsBonus;

        const lastItemMedals = lastItem.calculatedBonusMedals;

        const newMaxArts = lastSubSolution.totalArts + lastItem.set_arts_number;
        const newGSValue = lastSubSolution.gameSpeed + lastItem.calculatedBonusGS;
        const newMedalsValue = lastSubSolution.medalsBonus + lastItem.calculatedBonusMedals;

        if ((newGSValue >= lastGSValue && newMedalsValue > lastMedalsValue && newGSValue <= maxGS && lastItemMedals >= minMedalsPerSet)) {
            const _lastSets = lastSubSolution.sets.slice();
            _lastSets.push(lastItem);
            return { totalArts: newMaxArts, gameSpeed: newGSValue, medalsBonus: newMedalsValue, sets: _lastSets };
        } else {
            return lastSolution;
        }
    }

    // The right-bottom-corner cell of the grid contains the final solution for the whole problem.
    // It looks like last cell is not always the best one ? Probably related to double condition check in loops...
    // Getting each memo best results then
    function getLastOfEach(memo) {
        const memoResults = [];

        memo.map(memoArray => {
            return memoResults.push(memoArray[memoArray.length - 1]);
        });

        memoResults.sort((r1, r2) => r1.totalArts >= r2.totalArts && r1.gameSpeed >= r2.gameSpeed && r1.medalsBonus >= r2.medalsBonus ? -1 : 1);

        return memoResults[0];
        // const lastRow = memo[memo.length - 1];
        // return lastRow[lastRow.length - 1];
    }

    sets = filterSets(sets, findBonus, excludedFromOptimiser, artLevels, sixStarsLevel, sevenStarsLevel, eightStarsLevel);

    let results = [];
    // Creating loop to make multiple knapsacks
    for (let medals = 0; medals <= minMedalsPerSet; medals += 50) {
        // Filling the sub-problem solutions grid.
        let memo = [];
        for (let set = 0; set < sets.length; set++) {
            // Variable 'nbArts' is the maxArts for sub-problems.
            let row = [];
            for (let nbArts = 1; nbArts <= maxArts; nbArts++) {
                row.push(getSolution(set, nbArts, maxGS, medals, memo));
            }
            memo.push(row);
        }

        if (memo.length > 0) {
            // Push every knapsack best result to results
            results.push(getLastOfEach(memo));
        } else {
            results.push([]);
        }
    }

    // Stringify objects to make comparison easier (every object is set the same way, making this check safe)
    if (maxArts > 0) {
        results = results.map(set => {
            return JSON.stringify(set);
            // return set.totalArts === maxArts && maxArts > 1 ? JSON.stringify(set) : null;
        });
    } else {
        return [];
    }

    // Creating filtered results and a seen index arrays
    let filteredResults = [];
    let seen = [];

    results.map(set => {
        // If set has not been seen yet, his index will be -1 so we can safely save it to results
        // This will avoid any doubled result
        if (seen.indexOf(results.indexOf(set)) === -1 && set !== null) {
            seen.push(results.indexOf(set));
            // Save and parse back the set to JSON object
            return filteredResults.push(JSON.parse(set));
        } else {
            return null;
        }
    });

    // Sorting output by medals value
    return filteredResults.sort((set1, set2) => set1.gameSpeed >= set2.gameSpeed ? -1 : 1);
};
