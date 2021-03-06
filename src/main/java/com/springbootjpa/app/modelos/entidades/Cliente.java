package com.springbootjpa.app.modelos.entidades;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;


import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * Clase de Entidad que represanta la tabla "clientes" de la base de datos 
 * tiene una relacion bidireccional con factura , en la cual un Cliente puede tener muchas Facturas.
 * 
 * @author Daniel Manriquez
 */

@AllArgsConstructor
@Data
@Entity
@Table(name = "clientes")
public class Cliente extends EntidadAbstracta {

    private static final long serialVersionUID = 1L;
    
    @NotBlank
    @Column(name = "nombre")
    private String nombre;
    
    @NotBlank
    @Column(name = "apellido")
    private String apellido;
    
    @NotBlank
    @Email
    @Column(name = "email")
    private String email;
    
    @Column(name = "foto")
    private String foto;
    
    @OneToMany( mappedBy = "cliente" ,fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Factura> facturas ;
    
    public Cliente(){
    
        this.facturas= new ArrayList();
    }
    
    /**
     *Metodo que agrega una factura a la lista de facturas del cliente.
     * @param factura
     */
    public void agregarFactura(Factura factura ){
    
        this.facturas.add(factura);
        
    }
     
    public String getNombreCompleto(){
    
    
        return this.getNombre() + " " + this.getApellido();
    }
     
}
