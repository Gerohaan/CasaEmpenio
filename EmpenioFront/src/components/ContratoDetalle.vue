<template>
 <div>
  <button class="btn btn-danger" @click="generatePdf">generate PDF</button>
  <div>
    <h3>{{ this.newFecha }}</h3>
  </div>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios' 
import { date } from 'quasar'
const { addToDate } = date
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
    name: 'ContratoDetalle',
    data(){
    return{
      data: [],
      dataInfoEmp: [],
      newFecha: null
    }
  },
  created() {
      this.getContrato()
      this.getInfoEmp()
  },
  computed: {
    ...mapState(['userToken'])
  },
  methods:{
    
    generatePdf(){
      let fechaVcontrat = this.gestFechaAdd(this.data.createdAt, this.data.numero_dias)
      
      var docDefinition = {
        pageSize: 'LETTER',
        // by default we use portrait, you can change it to landscape if you wish
        //pageOrientation: 'landscape',
         content: [
		{
			text: this.dataInfoEmp[0].nombre,
			style: 'header',
            alignment: 'center',
            bold: true,
            fontSize: 15,
            margin: [ 0, -35, 0, 0 ],
		},
        {
			text: this.dataInfoEmp[0].direccion_empresa,
			style: 'header',
            alignment: 'center',
            bold: true,
            fontSize: 12,
		},
    {
			text: 'Pacto de Retracto       '+'Nro '+this.data.numero_contrato+'       '+'RIF: '+this.dataInfoEmp[0].rif,
			style: 'header',
            alignment: 'center',
            bold: true,
            fontSize: 12,
		},
    {
			text: [
				'Yo ',
				{ text: this.data.cliente.nombres+' '+this.data.cliente.apellidos, bold: true },
				' mayor de edad, ',
        { text: this.data.cliente.nacionalidad, bold: true },
        ' ESTADO CIVIL ',
        { text: this.data.cliente.edo_civil, bold: true },
        ' titular de la cedula de identidad Nro ',
				{ text: this.data.cliente.numero_cedula, bold: true },
        ' de este domicilio. Soy propietario de: ',
        { text: this.data.articulo.nombre, bold: true },
        ' lo cual me pertenece por haberlo adquirido : ',
        { text: this.data.origen_adquisicion, bold: true },
        '. El precio convenido es la cantidad de $',
        { text: this.data.precio_venta, bold: true },
        ' que recibo en este mismo acto a mi entera y cabal satisfacción. Vendo a la empresa ',
        { text: this.dataInfoEmp[0].nombre, bold: true },
        ', inscrita en el ',
        { text: this.dataInfoEmp[0].informacion_mercantil, bold: true },
        ', la cual se realiza en las instalaciones de la referida empresa, el bien antes descrito, reservandome el derecho de rescatarlo dentro del termino de recuperar la cosa vendida, mediante la restitución del precio. Debe reembolsar los gastos y costos que ocaciono la presente operación los cuales se estiman en mutuo y común acuerdo, que se reflejan a continuación: ',
        { text: ' PRECIO DE LA VENTA $ '+this.data.precio_venta, bold: true },
        { text: ', GASTOS Y COSTOS ', bold: true },
        { text: '$ '+this.data.gastos_costos, bold: true },
        { text: ', TOTAL CANCELAR $ '+this.data.total_cancelar, bold: true },
        '. Los cuales deberá cancelar el dia ',
        { text: fechaVcontrat, bold: true },
        ', que es el termino de este contrato. Dichos montos pactados en moneda extranjera están amparados según Providencia Administrativa 00071 dictada por el SENIAT en fecha 22 de noviembre 2011 y en los artículos 1 y 2 del Decreto Derogatorio de la Ley Contra Ilícitos Cambiarios, Resolución del BCV Convenio Cambiario Nro 1, Gaceta Oficial 6.405 del 7 de Septiembre del 2018, Si en el tiempo convenido se diera el caso de robo, hurto, desaparición, y/o perdida por fuerza mayor de lo que vendo la firma Comercial ',
        { text: this.dataInfoEmp[0].nombre, bold: true },
        ' solo respondera por el valor convenido. Así lo decidimos y firmamos en ',
        { text: 'BARINAS, '+this.fechaaActualString(), bold: true },
        '. Queda entendido que el presente contrato se celebra de conformidad con las disposiciones contenidas en los articulos 1534 al 1545 del código civil vigente.\n',
        //'\n',
        'NOTA: Únicamente podrá ejercer el retracto la persona que aparece como vendedora en este acto con su correspondiente contrato y el articulo será entregado al día siguiente de su cancelación.\n',
        '\n',
        '\n',
			],
     // margin: [0, 20, 0, 0],
      margin: [ -37, 6, -37, 2 ],
			alignment: 'justify',
      fontSize: 11,
		},
    {
      text: [
        { text: 'COMPRADOR', decoration: 'overline' },
        '               ',
        { text: fechaVcontrat, bold: true },
        '               ',
        { text: 'VENDEDOR', decoration: 'overline' },
        '     ',
        'C.I',
        { text: '              ', decoration: 'overline' },
      ],
      style: 'header',
            alignment: 'center',
            bold: true,
            fontSize: 11,
    }
	]
      };
      pdfMake.createPdf(docDefinition).open();

    },

     async getContrato() {
      let id = this.$route.params.id
      let API_URI_CONTRATO = 'http://localhost:3000/api/contremp/'+id
      let config = {
          headers: { Authorization: `Bearer ${this.userToken}` }
        }
      await axios.get(API_URI_CONTRATO, config).then(response => {
          this.data =  response.data
          //console.log(this.data)
      }).catch(err => {
        console.log(err.response.data)
      })

    },

    async getInfoEmp() {
      let API_URI_INFOEMP = 'http://localhost:3000/api/getInfoEmp/'
      let config = {
          headers: { Authorization: `Bearer ${this.userToken}` }
        }
      await axios.get(API_URI_INFOEMP, config).then(response => {
          this.dataInfoEmp =  response.data
          //console.log(this.dataInfoEmp)
      }).catch(err => {
        console.log(err.response.data)
      })
    },

    gestFechaAdd(fechaCreatedAt, diasContrat) {
      let timeStamp = fechaCreatedAt
      timeStamp = date.addToDate(timeStamp, { days: diasContrat })
      return date.formatDate(timeStamp, 'DD/MM/YYYY')
      
    },

    fechaaActualString(){
      let fechaActual = new Date()
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return fechaActual.toLocaleDateString("es-ES", options)
    }


  }
}
</script>