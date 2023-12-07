// Creo una clase LocalStorage con todos sus atributos, constructor y métodos posibles
/**
 * Representa una clase de utilidad para el almacenamiento local.
 */
//Clase LocalStorage
export class LocalStorage {
    // Método para obtener datos del localStorage
    static getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
 
    // Método para guardar datos en el localStorage
    static setData(key, data) {
 
        localStorage.setItem(key, JSON.stringify(data));
 
    }

}