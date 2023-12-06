//Creo una clase localStorage con todos sus atributos constructores y metodos posibles
export class LocalStorage {
    constructor() {
        this.database = localStorage;
    }

    insert(key, value) {
        this.database.setItem(key, JSON.stringify(value));
    }

    remove(key) {
        this.database.removeItem(key);
    }

    update(key, value) {
        if (this.database.getItem(key)) {
            this.database.setItem(key, JSON.stringify(value));
        }
    }

    getAll() {
        const data = [];
        for (let i = 0; i < this.database.length; i++) {
            const key = this.database.key(i);
            const value = JSON.parse(this.database.getItem(key));
            data.push({ key, value });
        }
        return data;
    }
}
