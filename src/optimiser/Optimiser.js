// BASE KNAPSACK CODE AT
// https://gist.github.com/lqt0223/21f033450a9d762ce8aee4da336363b1

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
                        excludedFromOptimiser.indexOf(setName) === -1) ? unifiedArray.push(set) : null;
        })
    });


    // Filtering sets to retreive only usefull data
    // Goal is to have lighter data to use with algorithm later
    let objectStyle = [];
    unifiedArray.map(set => {
        const bonusGSValue = findBonus(set, /Game Speed/) ? findBonus(set, /Game Speed/) : 0;
        const bonusMedalsValue = findBonus(set, /Increase Additional Medals Obtained/) ? findBonus(set, /Increase Additional Medals Obtained/) : 0;
        // const bonusGSValue = testGSValue ? testGSValue : 0;
        // const bonusMedalsValue = testMedalsValue ? testMedalsValue : 0;
        const avgGSByNBArts = bonusGSValue / set.set_arts_number;

        // Since GS and Medals Bonus are most important bonus, save those sets and flush the rest
        return bonusGSValue || bonusMedalsValue ?
            objectStyle.push({
                'setLevel': set.setLevel,
                'set_name': set.set_name.replace(/ \(\dp\)/g, ''),
                // 'set_name': set.set_name,
                'set_tech_name': set.set_tech_name,
                'set_arts_number': set.set_arts_number,
                'bonusGS': bonusGSValue,
                'bonusMedals': bonusMedalsValue,
                'avgGS': avgGSByNBArts,
                // 'artifact1': set.artifact1,
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
        const NO_SOLUTION = {totalArts: 0, gameSpeed: 0, medalsBonus: 0, sets: []};

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

        const lastItemMedals = lastItem.bonusMedals;

        const newMaxArts = lastSubSolution.totalArts + lastItem.set_arts_number;
        const newGSValue = lastSubSolution.gameSpeed + lastItem.bonusGS;
        const newMedalsValue = lastSubSolution.medalsBonus + lastItem.bonusMedals;

        if ((newGSValue >= lastGSValue && newMedalsValue >= lastMedalsValue && newGSValue <= maxGS && lastItemMedals >= minMedalsPerSet)) {
            const _lastSets = lastSubSolution.sets.slice();
            _lastSets.push(lastItem);
            return {totalArts: newMaxArts, gameSpeed: newGSValue, medalsBonus: newMedalsValue, sets: _lastSets};
        } else {
            return lastSolution;
        }
    }

    // The right-bottom-corner cell of the grid contains the final solution for the whole problem.
    function getLastOfEach(memo) {
        const lastRow = memo[memo.length - 1];
        return lastRow[lastRow.length - 1];
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
        console.log(medals)
        console.log(memo)
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
