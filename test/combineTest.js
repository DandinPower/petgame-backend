let { assert, should } = require('chai')
const app = require('../server')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = require('chai').expect
chai.use(chaiHttp)

/* Get 
chai.request(app)
    .get('/test')
    .end((err, res) => {
        assert.equal(404, res.status)
        assert.equal("can't find url", res.text)
        done()
    })
*/

/* Post 
chai.request(app)
    .post('/api/v1/urls')
    .set('content-type', 'application/json')
    .send({ url: 'test', expireAt: '2022-02-18T02:55:00.000Z' })
    .end((err, res) => {
        assert.equal(404, res.status)
        assert.equal('wrong url', res.text)
        done()
    })
*/

describe('combine test', async () => {
    //初始化測試
    before(async () => {

    })

    //初始化每個測試
    beforeEach(async () => {

    });

    //關閉每個測試
    afterEach(async () => {

    })

    it("測試正確的輸入", (done) => {
        chai.request(app)
            .post('/combine')
            .set('content-type', 'application/json')
            .send({
                "hand": "hand_0",
                "hat": "hat_1",
                "glasses": "none",
                "cloth": "cloth_0",
                "pant": "none",
                "pet": "pet_1",
                'tokenId': 0
            })
            .end((err, res) => {
                assert.equal(200, res.status)
                done()
            })
    })
})