export const findAllItemsWithSearch = `select 
                                        i.id, i.name, i.container_id, i.date_entered, c.name as container_name
                                      from 
                                        items i
                                      inner join containers c
                                      on c.id = i.container_id where i.user_id = ? and i.name like ?`

export const findAllItems = `select 
                              i.id, 
                              i.name, 
                              i.container_id, 
                              i.date_entered,
                              c.name as container_name
                            from  
                              items i
                            inner join containers c
                            on c.id = i.container_id
                            where i.user_id = ?`                                

export const getContainerByid = `select
                                  con.id,
                                  con.name,
                                  con.date_entered,
                                  cat.name as category_name,
                                  loc.name as location_name
                                from
                                  containers con
                                inner join categories cat on con.category_id = cat.id
                                inner join locations loc on loc.id = con.location_id
                                where
                                  con.user_id = ? and
                                  con.id = ?;`

//Just simple containeritem queries. Not returning any join for now
export const getContainerItems = `select
                                    i.id,
                                    i.name,
                                    i.date_entered
                                  from
                                    items i
                                  where
                                    i.user_id = ? and i.container_id = ?`

export const getContainerItem = `select
                                    i.id,
                                    i.name,
                                    i.date_entered
                                  from
                                    items i
                                  where 
                                    i.user_id = ? and i.id = ? and i.container_id = ?`                                    

export const createContainerItem =   `insert into items (name, date_entered, container_id, user_id) values (?,?,?,?)` 

export const createContainer =   `insert into containers (name, date_entered, category_id, location_id, user_id) values (?,?,?,?,?)` 

export const getItemCountWithSearch = `SELECT count(*) as totalCount from items i, containers c where c.id = i.container_id and i.name like ?`                                     
export const getItemCount = `SELECT count(*) as totalCount from items i, containers c where c.id = i.container_id`  

export const getLocations = `SELECT l.id, l.name from locations l`
export const getCategories = `SELECT c.id, c.name from categories c`

