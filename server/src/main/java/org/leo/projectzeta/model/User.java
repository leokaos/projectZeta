package org.leo.projectzeta.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.leo.projectzeta.api.Entidade;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user", schema = "rh")
@Setter
@Getter
@EqualsAndHashCode(of = "id")
public class User implements Entidade<String> {

    private static final long serialVersionUID = 2133295540287017546L;

    @Id
    @Column(name = "username")
    private String id;

    @Lob
    private String avatar;

    private String email;

}