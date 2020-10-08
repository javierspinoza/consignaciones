var app = new Vue({
    el:'#app',
    data:{
    
        arrayDatos: [],
        valor: null,
        saldo: 1000000,
        tipo: null,
        msj:""
      
    },
    methods: {
        procesar:function(){
            if (this.tipo=="c"){
                this.msj = "Consignación";
                this.consignar();
                this.mensaje();

            }else{
                this.msj = "Retiro";
                this.retirar();
                this.mensaje();
            }
        },
    
        consignar:function() { 
            // alert("consignando")
            this.saldo = this.saldo + parseInt(this.valor);
            this.arrayPush();
            // this.mensaje("Su consignación fue exitosa!!");                            
        },
        
        retirar: function() {
            // alert("retirando")
            this.saldo = this.saldo - parseInt(this.valor);                                                       
            this.arrayPush(); 
            // this.mensaje("Su retiro fue exitoso!!");                                                       
        },

        arrayPush:function(){
            this.arrayDatos.push({tipo:this.msj, valor:this.valor, saldo:this.saldo})
        },

        arraySplice:function(index, data=[]){
            // this.arrayDatos.splice(index,1);

            this.msjEliminar(data["valor"],index);

            // if (this.tipo=="c"){
            //     this.reintegro(data["valor"]);
            // }else{
            //     this.devolver(data["valor"]);
            // }
            // alert("se elimino");
        },

        reintegro:function(valor){
            this.saldo = this.saldo - parseInt(valor);
            this.mensaje();
        },

        devolver:function(valor){
            this.saldo = this.saldo + parseInt(valor);
            this.mensaje();
        },

        mensaje:function(mensaje){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Su transacción fue exitosa',
                ShowConfirmButtonText: false, 
                timer: 1350                       
            })
        },

        msjEliminar:function(valor,index){
            Swal.fire({
                title: 'Eliminar transacción',
                text: "Una vez eliminada la transacción, se hara el reenbolso",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                calcelButtonText: 'No'
            }).then((result) => {
                if (result.value) {

                this.arrayDatos.splice(index,1);
                if (this.tipo=="c"){
                    this.reintegro(valor);
                }else{
                    this.devolver(valor);
                }
                  this.mensaje();                  
                }
            })
        },

    }        
})