package zti.expenses.collections;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import zti.expenses.user.ApplicationUser;
import zti.expenses.user.ApplicationUserRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/collections")
public class CollectionController {

    private CollectionRepository collectionRepository;
    private ApplicationUserRepository applicationUserRepository;
    private ExpenseRepository expenseRepository;

    public CollectionController(CollectionRepository collectionRepository, ExpenseRepository expenseRepository,
                                ApplicationUserRepository applicationUserRepository){
        this.collectionRepository = collectionRepository;
        this.expenseRepository = expenseRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    @PostMapping
    public Collection addCollection(@RequestBody Collection collection, Authentication auth) {
        ApplicationUser user = applicationUserRepository.findByAuth(auth);
        collection.setOwner(user);
        collectionRepository.save(collection);
        return collection;
    }

    @GetMapping
    public List<Collection> getCollections(Authentication auth) {
        ApplicationUser user = applicationUserRepository.findByAuth(auth);
        return collectionRepository.findCollectionsByOwner(user);
    }

    @GetMapping("/exists")
    @ResponseBody
    public boolean exists(@RequestParam String name,  Authentication auth){
        ApplicationUser user = applicationUserRepository.findByAuth(auth);
        Collection collection = collectionRepository.findCollectionByNameAndOwner(name, user);
        return collection != null;
    }

    @PostMapping("/{id}/expenses")
    @ResponseBody
    public Expense addExpense(@RequestBody Expense expense, @PathVariable long id, HttpServletResponse response) throws IOException {
        Collection collection = collectionRepository.findCollectionById(id);
        if(collection == null){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Collection does not exist");
            return null;
        }
        expense.setCollection(collection);
        expense.setCreatedAt(new Date());
        expenseRepository.save(expense);
        return expense;
    }
}
