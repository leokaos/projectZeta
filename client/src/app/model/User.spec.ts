import { User } from "@model/User";

describe('User', () => {

    it('should deserialize', () => {

        let user = new User().deserialize({
            "id": "id_123",
            "avatar": "avatar_456"
        });

        expect(user.id).toBe("id_123");
        expect(user.avatar).toBe("avatar_456");
    });

});