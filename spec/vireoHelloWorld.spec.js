describe('Verify Vireo can be loaded', function () {
    it('and run a simple HelloWorld', function (done) {
        var vireo = new Vireo();

        var runSlicesAsync = rebootAndLoadVia(vireo, `
            define(MyVI dv(VirtualInstrument (
                Locals: c(
                )
                clump (
                Println("Hello World 🐣")
                )
            )))
            enqueue(MyVI)
        `);

        runSlicesAsync(function (rawPrint, rawPrintError) {
            expect(rawPrint).toBe('Hello World 🐣\n');
            expect(rawPrintError).toBe('');
            done();
        });

    });

    it('and make an HTTP Post', function (done) {
        var vireo = new Vireo();
        var runSlicesAsync = rebootAndLoadVia(vireo, `
            define(MyVI dv(VirtualInstrument (
                Locals: c(
                    e(dv(.UInt32 0) handle)
                    e('test=helloworldhttppostfromvireo' buffer)
                    e('' headers)
                    e('' body)
                    e(dv(.UInt32 0) statusCode)
                    e(c(
                        e(.Boolean status)
                        e(.Int32 code)
                        e(.String source)
                    ) error)
                    e(c(
                        e(c(
                            e(.String test)
                        ) form)
                    ) clusterRepresentation)
                )
                clump (
                    HttpClientPost(handle 'http://httpbin.org/post' '' buffer -1 headers body statusCode error)
                    UnflattenFromJSON(body clusterRepresentation * false false false error)
                    Println(clusterRepresentation.form.test)
                    Println(error.status)
                )
            ) ) )

            enqueue(MyVI)
        `);

        runSlicesAsync(function (rawPrint, rawPrintError) {
            expect(rawPrint).toBe('helloworldhttppostfromvireo\nfalse\n');
            expect(rawPrintError).toBe('');
            done();
        });
    });
});
