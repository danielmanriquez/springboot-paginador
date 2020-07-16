$(document).ready( function () {

            $("#buscar_producto").autocomplete({

                source: function (request, response) {
                    $.ajax({
                        url: "/factura/cargarProductos/" + request.term,
                        dataType: "json",
                        data: {
                            term: request.term

                        },
                        success: function (data) {

                            response($.map(data, function (item) {

                                return {

                                    value: item.id,
                                    label: item.nombre,
                                    precio: item.precio

                                };

                            }));
                        },

                    });

                },
                select: function (event, ui) {

                    //$("#buscar_producto").val(ui.item.label);
                    
                    if(itemsHelper.hasProducto(ui.item.value)){
                        
                        itemsHelper.incrementarCantidad(ui.item.value , ui.item.precio);
                        return false ;
                        
                    }
                    var linea = $("#plantillaItemsFactura").html();
                        linea = linea.replace(/{ID}/g, ui.item.value);
                        linea = linea.replace(/{NOMBRE}/g, ui.item.label);
                        linea = linea.replace(/{PRECIO}/g, ui.item.precio);
                        
                        $("#cargarItemProductos tbody").append(linea);
                        
                        
                        itemsHelper.calcularImporte(ui.item.value , ui.item.precio , 1);

                    return false;

                }



            });

             $("form").submit(function(){
                 
                 $("#plantillaItemsFactura").remove();
                 
                 return;
                 
                 
             })
        }
);

var itemsHelper = {
    
    calcularImporte : function (id , precio , cantidad ){
        
        console.log("Llamando al metodo calcular importe");
        console.log("importe total : " +parseInt(precio) * parseInt(cantidad));
        $("#total_importe_"+id).html(parseInt(precio) * parseInt(cantidad));
        this.calcularGranTotal();
    } , 
    
    hasProducto: function(id){
        
        var resultado = false;
        $('input[name="item_id[]"]').each(function(){
            
            if(parseInt(id) == parseInt($(this).val())){
                
                resultado = true ;
                
            }
        });
        
        return resultado;
        
    } , 
    
    incrementarCantidad: function(id , precio){
        
        var cantidad = $("#cantidad_" + id ).val() ? parseInt($("#cantidad_" + id ).val()) : 0 ;
        $("#cantidad_" + id ).val(++cantidad);
        this.calcularImporte(id , precio , cantidad );
        this.calcularGranTotal();
    } ,
    
    eliminarLineaFactura: function(id){
        
        $("#row_"+id).remove();
        this.calcularGranTotal();
        
    } ,
    calcularGranTotal: function(){
        
        console.log("Calculando gran total");
        var total = 0 ;
        
        $('span[id^="total_importe_"]').each(function(){
            
            
            total += parseInt($(this).html());
            
        });
        
        $("#gran_total").html(total);
        
    }
};