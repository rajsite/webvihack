describe('Verifies the Write to System Log VI', function () {
    beforeEach(function () {
        spyOn(console, 'log');
    });

    it('can log a simple message', function (done) {
        var vireo = new Vireo();
        var runSlicesAsync = rebootAndLoadVia(vireo, `
            define(MyVI dv(VirtualInstrument (
                Locals: c(
                    e(dv(.UInt32 0) handle)
                    e('{"webvihack_version":2,"message":"Hello World!", "severity":0}' buffer)
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
                    HttpClientPost(handle 'webvihack:webvihack_writetosystemlog' '' buffer -1 headers body statusCode error)
                    Println(body)
                )
            ) ) )

            enqueue(MyVI)
        `);

        runSlicesAsync(function (rawPrint, rawPrintError) {
            expect(rawPrint).toBe('0\n');
            expect(rawPrintError).toBe('');
            expect(console.log).toHaveBeenCalledWith('Hello World!');
            done();
        });
    });
});
