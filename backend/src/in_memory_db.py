import sqlite3


class InMemoryDB:
    def __init__(self):
        self.connection_string = ":memory:"
        self.conn = sqlite3.connect(
            self.connection_string, check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.initialize_db()

    def initialize_db(self):

        self.cursor.execute("CREATE TABLE users(name)")
        self.cursor.executemany("INSERT INTO users VALUES (?)", [
            ('mike',), ('dave',), ('paul',), ('marina',)])
        self.conn.commit()

    def get_names(self):
        self.cursor.execute("SELECT name FROM users")
        names = self.cursor.fetchall()
        return names

    def add_name(self, name: str) -> bool:
        try:
            self.cursor.execute(
                "INSERT INTO users (name) VALUES (?)", (name.lower().strip(), ))
            self.conn.commit()
            return name
        except Exception as e:
            self.conn.rollback()
            print(e)
            return False

    def delete_name(self, name: str):
        try:
            self.cursor.execute(
                "DELETE FROM users WHERE name = (?)", (name.lower().strip(), ))
            self.conn.commit()
            return name
        except Exception as e:
            self.conn.rollback()
            print(e)
            return False


in_memory_db = InMemoryDB()
