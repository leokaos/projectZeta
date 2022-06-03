package org.leo.projectzeta.factory;

import java.text.MessageFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class TempoFactory {

	public static final String FORMATO = "(([1-9]?[0-9])y)?(([1-2]?[0-9])m)?";

	private static final String FORMATO_COMPLETO = "{0}y{1}m";
	private static final String FORMATO_APENAS_MESES = "{0}m";
	private static final String FORMATO_APENAS_ANOS = "{0}y";

	private TempoFactory() {
		super();
	}

	public static String format(Tempo value) {

		if (value.hasYears() && value.hasMeses()) {
			return MessageFormat.format(FORMATO_COMPLETO, value.getAnos(), value.getMeses());
		} else if (value.hasYears() && !value.hasMeses()) {
			return MessageFormat.format(FORMATO_APENAS_ANOS, value.getAnos());
		} else if (!value.hasYears() && value.hasMeses()) {
			return MessageFormat.format(FORMATO_APENAS_MESES, value.getMeses());
		}

		return null;
	}

	public static Tempo parse(String str) {

		Pattern pattern = Pattern.compile(FORMATO);

		Matcher matcher = pattern.matcher(str);

		if (matcher.matches()) {

			int anos = 0;
			int meses = 0;

			if (matcher.group(2) != null) {
				anos = Integer.valueOf(matcher.group(2));
			}

			if (matcher.group(4) != null) {
				meses = Integer.valueOf(matcher.group(4));
			}

			return new Tempo(anos, meses);
		}

		throw new IllegalArgumentException();
	}

}
