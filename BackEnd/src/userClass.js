import fs from 'fs';

export default class User{
    constructor(rutaBD){
        this.rutaBD = __dirname + rutaBD;
    }
    async user(){
        try {
            const todos = await fs.promises.readFile(this.rutaBD,'utf-8')
            return JSON.parse(todos)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    async idUser (id){
        try {
            const todos = await this.user()
            const resultado = todos.find(e=>e.id==id)
            return resultado
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }

    }
}