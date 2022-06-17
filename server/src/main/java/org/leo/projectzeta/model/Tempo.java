package org.leo.projectzeta.model;

import java.io.Serializable;

public class Tempo implements Serializable {

	private static final long serialVersionUID = 7947574726248278620L;

	private int anos;
	private int meses;

	public Tempo() {
		this(0, 0);
	}

	public Tempo(int anos, int meses) {
		super();
		this.anos = anos;
		this.meses = meses;
	}

	public int getAnos() {
		return anos;
	}

	public void setAnos(int anos) {
		this.anos = anos;
	}

	public int getMeses() {
		return meses;
	}

	public void setMeses(int meses) {
		this.meses = meses;
	}

	public boolean hasYears() {
		return anos != 0;
	}

	public boolean hasMeses() {
		return meses != 0;
	}

}
