class Achievement {
    constructor(data) {
        Object.assign(
            this,
            {
                name: '',
                description: '',
                image: '',
            },
            data
        )
    }
};

export default Achievement;