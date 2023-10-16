function createDateString(timestamp) {
    const day = new Date(timestamp);
    return day.toLocaleDateString('en-UK',
        { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'});
}

export default createDateString;