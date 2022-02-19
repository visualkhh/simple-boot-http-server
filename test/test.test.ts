import 'reflect-metadata';
import {ReflectUtils} from 'simple-boot-core/utils/reflect/ReflectUtils';
// import FormData from 'form-data'
describe('test', () => {
    test('test', async (done) => {
        const data = new FormData();
        const dataStr = 'id=999&value=content';
        const urlSearchParam = new URLSearchParams(dataStr);
        Array.from(urlSearchParam.entries()).forEach(([k, v]) => {
            data.append(k, v);
        })
        console.log(urlSearchParam.toString())
        console.log(data.has('value'))
        const i = 1 + 1;
        console.log(i)
        expect(i).toBe(2)
        done()
    })

    test('test2', async (done) => {
        console.log('------');
        // ReflectUtils.getParameterTypes();
        done()
    })
})
