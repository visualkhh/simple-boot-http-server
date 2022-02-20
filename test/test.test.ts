import 'reflect-metadata';
import {ReflectUtils} from 'simple-boot-core/utils/reflect/ReflectUtils';
// import FormData from 'form-data'
describe('test', () => {
    test('test', async (done) => {
        // const data = new FormData();
        // const dataStr = 'id=999&value=content';
        // const urlSearchParam = new URLSearchParams(dataStr);
        // Array.from(urlSearchParam.entries()).forEach(([k, v]) => {
        //     data.append(k, v);
        // })
        // console.log(urlSearchParam.toString())
        // console.log(data.has('value'))
        // const i = 1 + 1;
        // console.log(i)
        expect(2).toBe(2)
        done()
    })

    test('test2', async (done) => {
        console.log('------');
        // ReflectUtils.getParameterTypes();
        done()
    })

    test('type', async (done) => {
        class Test {
            constructor() {
            }

            get(): void {
                console.log('---')
            }

            say(): void {
                console.log('---')
            }
        }
        const object1 = {
            a: 1,
            b: 2,
            c: 3
        };

        const test = new Test();//.say();
        const data = Object.getPrototypeOf(Test.prototype)
        const data2 = Reflect.getPrototypeOf(Test.prototype)
        const data3 = Object.getOwnPropertyNames(Test.prototype)
        console.log('------', data, data2, data3);
        // ReflectUtils.getParameterTypes();
        done()
    })
})
