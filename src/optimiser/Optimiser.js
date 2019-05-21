// BASE KNAPSACK CODE AT
// https://gist.github.com/lqt0223/21f033450a9d762ce8aee4da336363b1

export const calculateMedalsFromEnhancement = (bonusMedals, elvl) => {
    return bonusMedals + ((bonusMedals / 2) * elvl);
};

export const calculateGSFromEnhancement = (bonusGS, artLevel, trans, elvl) => {
    const lvl0 = elvl === 0;
    const lvl1 = elvl === 1;
    const lvl2 = elvl === 2;
    const trans0 = trans === 'T0';
    const trans1 = trans === 'T1';
    const trans2 = trans === 'T2';
    const trans3 = trans === 'T3';

    if (artLevel === '6*') {
        if (trans0) {
            return bonusGS === 15 ? lvl0 ? 15 : lvl1 ? 17 : 19 :
                bonusGS === 25 ? lvl0 ? 25 : lvl1 ? 28 : 32 : 0;
        } else if (trans1) {
            return bonusGS === 22 ? lvl0 ? 22 : lvl1 ? 25 : 28 :
                bonusGS === 37 ? lvl0 ? 37 : lvl1 ? 42 : 47 : 0;
        } else if (trans2) {
            return bonusGS === 26 ? lvl0 ? 26 : lvl1 ? 29 : 33 :
                bonusGS === 45 ? lvl0 ? 45 : lvl1 ? 51 : 57 : 0;
        } else if (trans3) {
            return bonusGS === 27 ? lvl0 ? 27 : lvl1 ? 31 : 34 :
                bonusGS === 46 ? lvl0 ? 46 : lvl1 ? 52 : 58 : 0;
        }
    } else if (artLevel === '7*') {
        if (trans0) {
            return bonusGS === 37 ? lvl0 ? 37 : lvl1 ? 43 : lvl2 ? 48 : 54 :
                bonusGS === 16 ? lvl0 ? 16 : lvl1 ? 18 : lvl2 ? 21 : 23 : 0;
        } else if (trans1) {
            return bonusGS === 38 ? lvl0 ? 38 : lvl1 ? 44 : lvl2 ? 49 : 55 :
                bonusGS === 23 ? lvl0 ? 23 : lvl1 ? 26 : lvl2 ? 30 : 33 : 0;
        } else if (trans2) {
            return bonusGS === 50 ? lvl0 ? 50 : lvl1 ? 58 : lvl2 ? 65 : 73 :
                bonusGS === 30 ? lvl0 ? 30 : lvl1 ? 35 : lvl2 ? 39 : 44 : 0;
        }
    } else if (artLevel === '8*') {
        // Only trans0 for now and 1 speed available, no data available for enhance 4
        if (trans0) {
            return bonusGS === 47 ? lvl0 ? 47 : lvl1 ? 53 : lvl2 ? 60 : 67 : 0;
        }
    }
};

// Making a filter method upon existing sets to get the most powerfull ones
export const filterSets = (
    sets, findBonus, excludedFromOptimiser = [], sixStarsLevel = 'T3', sevenStarsLevel = 'T2', EightStarsLevel = 'T0'
) => {
    // Sets filter
    const artLevels = /[6-8]/g;

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
                        (setLevel === EightStarsLevel &&
                            artLevel === '8' &&
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
                'setLevel': set.setLevel,
                'set_name': set.set_name.replace(/ \(\dp\)/g, ''),
                // 'set_name': set.set_name,
                'set_tech_name': set.set_tech_name,
                'set_arts_number': set.set_arts_number,
                'set_total_arts_number': set.set_total_arts_number,
                'bonusGS': bonusGSValue,
                'calculatedBonusGS': bonusGSValue ?
                    fullSet ? calculateGSFromEnhancement(bonusGSValue, set.artifact1.art_level, set.setLevel, set.enhance_level) : bonusGSValue : 0,
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

// KNAPSACK ALGORITHM MODIFIED A BIT TO FIT THE APP NEEDS
export const knapsack = (
    sets, maxArts, maxGS, minMedalsPerSet, findBonus, excludedFromOptimiser, sixStarsLevel, sevenStarsLevel, EightStarsLevel
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

    sets = filterSets(sets, findBonus, excludedFromOptimiser, sixStarsLevel, sevenStarsLevel, EightStarsLevel);

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
