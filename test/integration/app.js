describe('Routes: Books', () => {

    const Books = app.datasource.models.Books,

        defaultBooks = {
            id: 1,
            name: 'Default Book'
        };

    //detroi e roda o teste
    beforeEach(done => {
        Books
            .destroy({ where: {} })
            .then(() => Books.create(defaultBooks))
            .then(() => {
                done();
            });
    });

    describe('Route GET /books', () => {
        it('should retun a list of books', done => {
            request
                .get('/books')
                .end((err, res) => {
                    expect(res.body[0].id).to.be.eql(defaultBooks.id);
                    expect(res.body[0].name).to.be.eql(defaultBooks.name);
                    done(err)
                });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('should retun a book', done => {
            request
                .get('/books/1')
                .end((err, res) => {
                    expect(res.body.id).to.be.eql(defaultBooks.id);
                    done(err);
                });
        });
    });

    describe('Route POST /book', () => {
        it('should create a book', done => {

            const newBook = {
                id: 2,
                name: 'newBook'
            };

            request
                .post('/books')
                .send(newBook)
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(newBook.id);
                    expect(res.body.name).to.be.eql(newBook.name);

                    done(err);
                });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('should update a book', done => {

            const UpdatedBook = {
                id: 1,
                name: 'Updated Book'
            };

            request
                .put('/books/1')
                .send(UpdatedBook)
                .end((err, res) => {
                    //console.log('RESPONSE', res.body) //teste retorna linha afetadas
                    expect(res.body).to.be.eql([1]);
                    done(err);
                });
        });
    });

    //don't have body
    describe('Route DELETE /books/{id}', () => {
        it('should delete a book', done => {
            request
                .delete('/books/1')
                .end((err, res) => {
                    expect(res.statusCode).to.be.eql(204);
                    done(err);
                });
        });
    });

})