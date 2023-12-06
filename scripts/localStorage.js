// Creo una clase LocalStorage con todos sus atributos, constructor y métodos posibles
/**
 * Representa una clase de utilidad para el almacenamiento local.
 */
export class LocalStorage {
    /**
     * Crea una instancia de LocalStorage.
     */
    constructor() {
        this.database = localStorage;
    }

    /**
     * Inserta un par clave-valor en el almacenamiento local.
     * @param {string} key - La clave a insertar.
     * @param {any} value - El valor a insertar.
     */
    insertar(key, value) {
        this.database.setItem(key, JSON.stringify(value));
    }

    /**
     * Elimina un par clave-valor del almacenamiento local.
     * @param {string} key - La clave a eliminar.
     */
    eliminar(key) {
        this.database.removeItem(key);
    }

    /**
     * Actualiza el valor de una clave en el almacenamiento local.
     * @param {string} key - La clave a actualizar.
     * @param {any} value - El nuevo valor a establecer.
     */
    actualizar(key, value) {
        if (this.database.getItem(key)) {
            this.database.setItem(key, JSON.stringify(value));
        }
    }

    /**
     * Obtiene todos los pares clave-valor del almacenamiento local.
     * @returns {Array} - Un array de objetos que contienen los pares clave-valor.
     */
    obtenerTodos() {
        const data = [];
        for (let i = 0; i < this.database.length; i++) {
            const key = this.database.key(i);
            const value = JSON.parse(this.database.getItem(key));
            data.push({ key, value });
        }
        return data;
    }
}
