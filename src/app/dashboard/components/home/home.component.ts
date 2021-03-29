import { Component, OnInit } from '@angular/core';
import { cardData } from '../../Models/cardData.model';


declare const $:any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: cardData[] = []
  dataFiltered: cardData[] = []

  obs = false

  constructor() {
    this.data = [
      {
        bgColor: 'rgb(216, 27, 96, 0.7)',
        title: 'quimica',
        desc: 'Estudia la materia, la energía y sus cambios. El objeto de estudio de la Química son las sustancias y sus interacciones. La Química es la ciencia de las sustancias.'
      },
      {
        bgColor: 'rgb(211, 47, 47, 0.7)',
        title: 'fisica',
        desc: 'Estudia las propiedades de la materia y de la energía y establece las leyes que explican los fenómenos naturales, excluyendo los que modifican la estructura molecular de los cuerpos.'
      },
      {
        bgColor: 'rgb(39, 174, 96, 0.7)',
        title: 'biologia',
        desc: 'Estudia a los seres vivos y sus características, como su origen, su evolución y Page 2 sus propiedades, nutrición, morfogénesis, reproducción (asexual y sexual), patogenia, etc.'
      },
      {
        bgColor: 'rgb(255, 87, 34, 0.7)',
        title: 'matematicas',
        desc: 'Es una ciencia formal que, partiendo de axiomas y siguiendo el razonamiento lógico, estudia las propiedades, estructuras abstractas y relaciones entre entidades abstractas como números, figuras geométricas, iconos, glifos, o símbolos en general.'
      },
      {
        bgColor: 'rgb(93, 173, 226, 0.7)',
        title: 'mitologia',
        desc: 'La mitología es un conjunto de mitos relativamente cohesionados o paralelamente adheridos: relatos que forman parte de una determinada religión o cultura.'
      },
      {
        bgColor: 'rgb(69, 90, 100, 0.7)',
        title: 'tecnologia',
        desc: 'Es el conjunto de conocimientos y técnicas que, aplicados de forma lógica y ordenada, permiten al ser humano modificar su entorno material o virtual para satisfacer sus necesidades, esto es, un proceso combinado de pensamiento y acción con la finalidad de crear soluciones útiles.'
      },
      {
        bgColor: 'rgb(253, 216, 53, 0.7)',
        title: 'astrologia',
        desc: 'Es un conjunto de tradiciones y creencias que sostienen que es posible reconocer o construir un significado de los eventos celestes y de las constelaciones.'
      },
      {
        bgColor: 'rgb(135, 54, 0, 0.7)',
        title: 'historia',
        desc: 'Es la ciencia que estudia los sucesos del pasado; generalmente son de la humanidad, aunque, también puede no estar centrada en el humano ​. Asimismo, es una disciplina académica que narra dichos acontecimientos.'
      },
    ]
  }

  ngOnInit(): void {
  }
  

  search = (title: string) => {
    this.dataFiltered = this.data.filter((cd: cardData) => cd.title.toLowerCase().includes(title.toLowerCase()))    
    
  
    if (title.length > 0) {
      this.obs = true
    }

  }
}

