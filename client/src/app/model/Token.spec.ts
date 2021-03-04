import { Token } from "@app/model/Token";

describe('Token', () => {

    it('should deserialize', () => {

        const expectedDate = new Date(2010, 1, 1, 0, 0, 0, 0);

        let token = new Token().deserialize({
            "token": "abc123",
            "expiraEm": expectedDate.getTime()
        });

        expect(token.token).toBe("abc123");
        expect(token.expiraEm).toEqual(expectedDate);
    });

    it('should deserialize a empty token', () => {

        let token = new Token().deserialize(null);

        expect(token.token).toBeUndefined()
        expect(token.expiraEm).toBeUndefined();
    });

});