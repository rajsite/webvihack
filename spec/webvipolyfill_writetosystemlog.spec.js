describe('Verifies the Write to System Log VI webvipolyfill', function () {
    beforeEach(function () {
        spyOn(console, 'log');
    });

    it('can log a simple message', function (done) {
        var vireo = new Vireo();
        var runSlicesAsync = rebootAndLoadVia(vireo, `
            define(MyVI dv(VirtualInstrument (
                Locals: c(
                    e(dv(.UInt32 0) handle)
                    e('Hello World!' buffer)
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
                    HttpClientPost(handle 'webvipolyfill:writetosystemlog' '' buffer -1 headers body statusCode error)
                    Println(body)
                    Println(error.status)
                )
            ) ) )

            enqueue(MyVI)
        `);

        runSlicesAsync(function (rawPrint, rawPrintError) {
            expect(rawPrint).toBe('\nfalse\n');
            expect(rawPrintError).toBe('');
            expect(console.log).toHaveBeenCalledWith('Hello World!');
            done();
        });
    });
});
