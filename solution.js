function solution(D) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayValues = {};
    const dayCounts = {};

    function getWeekday(dateStr) {
        const d = new Date(dateStr);
        const jsDay = d.getUTCDay();
        const map = [6, 0, 1, 2, 3, 4, 5];
        return days[map[jsDay]];
    }

    for (const [date, val] of Object.entries(D)) {
        const day = getWeekday(date);
        if (!dayValues.hasOwnProperty(day)) {
            dayValues[day] = 0;
            dayCounts[day] = 0;
        }
        dayValues[day] += val;
        dayCounts[day] += 1;
    }

    const output = {};
    for (let i = 0; i < days.length; ++i) {
        const day = days[i];
        if (dayValues.hasOwnProperty(day)) {
            output[day] = dayValues[day];
        } else {
            let prev = (i + 6) % 7, next = (i + 1) % 7;
            while (!dayValues.hasOwnProperty(days[prev])) prev = (prev + 6) % 7;
            while (!dayValues.hasOwnProperty(days[next])) next = (next + 1) % 7;
            output[day] = Math.floor((dayValues[days[prev]] + dayValues[days[next]]) / 2);
        }
    }

    return output;
}

// Sample usage:
const input = {
  '2020-01-01': 4, '2020-01-02': 4, '2020-01-03': 6,
  '2020-01-04': 8, '2020-01-05': 2, '2020-01-06': -6,
  '2020-01-07': 2, '2020-01-08': -2
};

const inputs = {
  '2020-01-01': 6, '2020-01-04': 12, '2020-01-05': 14, '2020-01-06': 2, '2020-01-07': 4
};

console.log(solution(input));
console.log(solution(inputs));