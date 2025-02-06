from in_memory_db import in_memory_db


class Service:
    def __init__(self):
        pass

    def get_names(self):
        return [name[0] for name in in_memory_db.get_names()]

    def add_name(self, name: str):
        return in_memory_db.add_name(name)

    def delete_name(self, name: str):
        return in_memory_db.delete_name(name)


data_svc = Service()
